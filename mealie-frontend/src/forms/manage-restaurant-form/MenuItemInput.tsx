import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className='flex flex-row items-end gap-2'>
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={field.name} className='flex items-center gap-1'>
              Name
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder='Cheese Pizza' className='bg-white' />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`menuItems.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={field.name} className='flex items-center gap-1'>
              Description
              <FormMessage />
            </FormLabel>

            <FormControl>
              <Input {...field} placeholder='Delicious pizza with cheese' className='bg-white' />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={field.name} className='flex items-center gap-1'>
              Price (€)
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder='10.99' className='bg-white' />
            </FormControl>
          </FormItem>
        )}
      />

      <Button 
        type='button' 
        onClick={removeMenuItem} 
        className='bg-red-500 max-h-fit'>
          Remove
      </Button>
    </div>

  );
};

export default MenuItemInput;
