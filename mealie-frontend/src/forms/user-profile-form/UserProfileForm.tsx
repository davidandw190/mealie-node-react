import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React, { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/LoadingButton';
import { User } from '@/types/types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  addressLine1: z.string().min(1, { message: 'Address Line 1 is required' }),
  city: z.string().min(3, { message: 'City must be at least 3 characters long' }),
  country: z.string().min(3, { message: 'Country must be at least 3 characters long' }),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: UserFormData) => void;
  isLoading: boolean;
  formTitle?: string;
  buttonText?: string;
  currentUser: User;
};

const UserProfileForm: React.FC<Props> = ({
  onSubmit,
  isLoading,
  buttonText = 'Update',
  formTitle = 'Update Profile',
  currentUser,
}: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 bg-gray-50 rounded-lg md:p-10'
      >
        <div>
          <h2 className='text-2x1 font-bold'> {formTitle} </h2>
          <FormDescription>View and update your profile information below.</FormDescription>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col md:flex-row gap-4'>
          <FormField
            control={form.control}
            name='addressLine1'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className='bg-white' />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type='submit' className='bg-orange-500'>
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserProfileForm;
