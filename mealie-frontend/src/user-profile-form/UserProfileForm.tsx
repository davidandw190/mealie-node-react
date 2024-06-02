import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(3, { message: 'Name is required' }),
  addressLine1: z.string().min(1, { message: 'Address Line 1 is required' }),
  city: z.string().min(3, { message: 'City is required' }),
  country: z.string().min(3, { message: 'Country is required' }),
});

type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: UserFormData) => void;
  isLoading: boolean;
};

const UserProfileForm: React.FC<Props> = ({onSubmit, isLoading }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 bg-gray-50 rounded-lg md:p-10'
      >
        <div>
          <h2 className='text-2x1 font-bold'> User Profile Form</h2>
          <FormDescription>View and change your profile information here</FormDescription>
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className='bg-white' />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='addressLine1'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='country'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} className='bg-white' />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default UserProfileForm;
