import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

const ImageSection = () => {
  const { control } = useFormContext();

  return (
    <div className='space-y-2'>
      <div>
        <h2 className='text-2x1 font-bold'>Image</h2>
        <FormDescription>
          Add an image of your restaurant to make it stand out. Adding a new image will override the
          existing one.
        </FormDescription>
      </div>

      <div className='flex flex-col gap-8 w-[50%]'>
        <FormField
          control={control}
          name='imageFile'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  className='bg-white'
                  onChange={(event) =>
                    field.onChange(event.target.files ? event.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
