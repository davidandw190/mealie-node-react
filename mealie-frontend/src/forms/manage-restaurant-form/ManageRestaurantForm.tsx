import CuisinesSection from './CuisinesSection';
import DetailsSection from './DetailsSection';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
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

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (data: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryPrice: 0,
      estimatedDeliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: '', description: '', price: 0 }],
    },
  });

  const onSubmit = (data: restaurantFormData) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-gray-50 p-10 rounded-1g'>
        <DetailsSection />
        <Separator />
        <CuisinesSection />
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
