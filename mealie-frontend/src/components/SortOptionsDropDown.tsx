import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Button } from './ui/button';

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: 'Best Match',
    value: 'bestMatch',
  },
  {
    label: 'Delivery Price',
    value: 'deliveryPrice',
  },
  {
    label: 'Estimated Delivery Time',
    value: 'estimatedDeliveryTime',
  },
];

const SortOptionsDropDown: React.FC<Props> = ({ onChange, sortOption }) => {
  const selectedSortLabel =
    SORT_OPTIONS.find(option => option.value === sortOption)?.label || SORT_OPTIONS[0].label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer'>
        <Button variant='outline' className='w-full'>
          Sort by: {selectedSortLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map(option => (
          <DropdownMenuItem onClick={() => onChange(option.value)} className='cursor-pointer'>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionsDropDown;
