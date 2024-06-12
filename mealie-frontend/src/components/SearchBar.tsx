import { Form, FormControl, FormField, FormItem } from './ui/form';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const searchFormSchema = z.object({
  searchQuery: z.string({
    required_error: 'Search Query is required',
  }),
});

export type SearchForm = z.infer<typeof searchFormSchema>;

type Props = {
  onSubmit: (searchForm: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, onReset, searchQuery, placeholder }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({
      searchQuery,
    });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: '',
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 
          ${form.formState.errors.searchQuery && ' border-red-500'}`}
      >
        <Search strokeWidth={2.5} size={30} className='ml-1 text-orange-500 hidden md:block' />
        <FormField
          control={form.control}
          name='searchQuery'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input
                  {...field}
                  className='border-none shadow-none text-x1 focus-visible:ring-0'
                  placeholder={placeholder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button onClick={handleReset} type='button' variant='outline' className='rounded-full'>
          Reset
        </Button>

        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
