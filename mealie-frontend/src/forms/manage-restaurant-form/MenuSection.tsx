import { FormDescription, FormField, FormItem } from '@/components/ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import MenuItemInput from './MenuItemInput';

const MenuSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'menuItems',
  });

  return (
    <div className='space-y-2'>
      <div>
        <h2 className='text-2x1 font-bold'>Menu</h2>
        <FormDescription>
          Create your menu and add items that you offer to your customers.
        </FormDescription>
      </div>
      <FormField
        control={control}
        name='menuItems'
        render={() => (
          <FormItem className='flex flex-col gap-2'>
            {fields.map((_, index) => (
              <MenuItemInput index={index} removeMenuItem={() => remove(index)} />
            ))}
          </FormItem>
        )}
      />
      <Button type='button' onClick={() => append({ name: '', description: '', price: 0 })}>
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
