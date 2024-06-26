import { Button } from '@/components/ui/button';
import CuisinesSection from './CuisinesSection';
import DetailsSection from './DetailsSection';
import { Form } from '@/components/ui/form';
import ImageSection from './ImageSection';
import LoadingButton from '@/components/LoadingButton';
import MenuSection from './MenuSection';
import { Restaurant } from '@/types/types';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z
  .object({
    restaurantName: z.string().min(1, { message: 'Restaurant name is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    deliveryPrice: z.coerce
      .number({ required_error: 'Delivery price is required' })
      .positive('Delivery price must be a positive number'),
    estimatedDeliveryTime: z.coerce
      .number({ required_error: 'Estimated delivery time is required' })
      .positive('Estimated delivery time must be a positive number'),
    cuisines: z.array(z.string()).min(1, { message: 'Please select at least one cuisine' }),
    menuItems: z
      .array(
        z.object({
          name: z.string().min(5, 'Menu item name is required'),
          description: z.string().min(5, 'Menu item description is required'),
          price: z.coerce.number().positive('Menu item price must be a positive number'),
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

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  ownedRestaurant?: Restaurant;
  onSave: (data: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, ownedRestaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: '', description: '', price: 0 }],
    },
  });

  useEffect(() => {
    if (!ownedRestaurant) return;

    const deliveryPriceFormatted = parseInt((ownedRestaurant.deliveryPrice / 100).toFixed(2));
    const menuItemsFormatted = ownedRestaurant.menuItems.map(menuItem => ({
      ...menuItem,
      price: parseInt((menuItem.price / 100).toFixed(2)),
    }));

    const displayedRestaurantDetails = {
      ...ownedRestaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(displayedRestaurantDetails);
  }, [form, ownedRestaurant]);

  const onSubmit = (data: RestaurantFormData) => {
    const formData = new FormData();

    formData.append('restaurantName', data.restaurantName);
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('deliveryPrice', (data.deliveryPrice * 100).toString());
    formData.append('estimatedDeliveryTime', data.estimatedDeliveryTime.toString());
    formData.append('cuisines', JSON.stringify(data.cuisines));
    data.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}].name`, menuItem.name);
      formData.append(`menuItems[${index}].description`, menuItem.description);
      formData.append(`menuItems[${index}].price`, (menuItem.price * 100).toString());
    });

    if (data.imageFile) {
      formData.append(`imageFile`, data.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-gray-50 p-10 rounded-1g'>
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type='submit'>Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
