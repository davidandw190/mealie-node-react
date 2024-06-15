import { Request, Response } from 'express';

import { MenuItem } from '../models/menu-item.model';
import RestaurantModel from '../models/restaurant.model';
import Stripe from 'stripe';

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

type OrderCheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const createOrderCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: OrderCheckoutSessionRequest = req.body;

    const targetRestaurant = await RestaurantModel.findById(checkoutSessionRequest.restaurantId);

    if (!targetRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const lineItems = createOrderLineItems(checkoutSessionRequest, targetRestaurant.menuItems);

    const session = await createSession(
      lineItems,
      'TEST_ORDER_ID',
      targetRestaurant.deliveryPrice,
      targetRestaurant._id.toString(),
    );

    if (!session.url) {
      return res.status(500).json({ message: 'Failed to create session' });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.raw.message });
  }
};

const createOrderLineItems = (
  checkoutSessionRequest: OrderCheckoutSessionRequest,
  menuItems: MenuItem[],
): Stripe.Checkout.SessionCreateParams.LineItem[] => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const displyedMenuItem = menuItems.find(
      (menuItem) => menuItem._id.toString() === cartItem.menuItemId.toString(),
    );

    if (!displyedMenuItem) {
      throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
    }

    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: 'gbp',
        unit_amount: displyedMenuItem.price,
        product_data: {
          name: displyedMenuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };

    return line_item;
  });

  return lineItems;
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string,
): Promise<Stripe.Response<Stripe.Checkout.Session>> => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery',
          type: 'fixed_amount',
          fixed_amount: {
            amount: deliveryPrice,
            currency: 'gbp',
          },
        },
      },
    ],
    mode: 'payment',
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/details/${restaurantId}?cancelled=true`,
  });

  return sessionData;
};
