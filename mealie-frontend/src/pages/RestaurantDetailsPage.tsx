import { Card, CardFooter } from '@/components/ui/card';

import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import CheckoutButton from '@/components/CheckoutButton';
import { MenuItem } from '@/types/types';
import MenuItemCard from '@/components/MenuItemCard';
import OrderSummary from '@/components/OrderSummary';
import RestaurantInfo from '@/components/RestaurantInfo';
import { useParams } from 'react-router-dom';
import { useRetrieveRestaurantDetails } from '@/api/RestaurantAPI';
import { useState } from 'react';

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const RestaurantDetailsPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useRetrieveRestaurantDetails(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (addedMenuItem: MenuItem) => {
    setCartItems(prevCartItems => {
      const existingCartItem = prevCartItems.find(cartItem => cartItem._id === addedMenuItem._id);

      let updatedCartItems: CartItem[];

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map(cartItem =>
          cartItem._id === addedMenuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: addedMenuItem._id,
            name: addedMenuItem.name,
            price: addedMenuItem.price,
            quantity: 1,
          },
        ];
      }

      return updatedCartItems;
    });
  };

  const removeFromCart = (removedCartItem: CartItem) => {
    setCartItems(prevCartItems => {
      return prevCartItems.filter(item => item._id != removedCartItem._id);
    });
  };

  if (isLoading || !restaurant) {
    return 'Loading...';
  }

  return (
    <div className='flex flex-col gap-10'>
      <AspectRatio ratio={16 / 5}>
        <img src={restaurant?.imageUrl} className='rounded-md object-cover h-full w-full' />
      </AspectRatio>
      <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
        <div className='flex flex-col gap-4'>
          <RestaurantInfo restaurant={restaurant} />
          <span className='text-2xl font-bold tracking-tight'>Menu</span>
          {restaurant?.menuItems.map((menuItem: MenuItem) => (
            <MenuItemCard menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <span>
                <CheckoutButton />
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
