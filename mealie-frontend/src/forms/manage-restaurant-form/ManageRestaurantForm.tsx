import { z } from 'zod';

const formSchema = z
  .object({
    restaurantName: z.string().min(1, { message: 'Restaurant name is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    deliveryPrice: z
      .number({ required_error: 'Delivery price is required' })
      .positive('Delivery price must be a positive number'),
    estimatedDeliveryTime: z
      .number({ required_error: 'Estimated delivery time is required' })
      .positive('Estimated delivery time must be a positive number'),
    cuisines: z.array(z.string()).min(1, { message: 'Please select at least one cuisine' }),
    menuItems: z
      .array(
        z.object({
          name: z.string().min(1, 'Menu item name is required'),
          price: z.number().positive('Menu item price must be a positive number'),
        }),
      )
      .min(1, { message: 'Please add at least one menu item' }),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: 'Image is required' }).optional(),
  })
  .refine(data => data.imageUrl || data.imageFile, {
    message: 'Either an image URL or an image file must be provided',
    path: ['imageFile'],
  });

type Props = {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSubmit, isLoading }: Props) => {};

export default ManageRestaurantForm;
