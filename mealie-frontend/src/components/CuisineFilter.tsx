import { ChangeEvent } from 'react';
import { Check } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { cuisinesList } from '../../config/restaurant-options.config';

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClicked: () => void;
};

const CuisineFilter = ({ onChange, selectedCuisines, isExpanded, onExpandedClicked }: Props) => {
  const handleCuisinesReset = () => onChange([]);

  function handleCuisinesChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <div className='flex justify-between items-center px-2'>
        <div className='text-md font-semibold mb-2'>Filter By Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className='text-sm font-semibold mb-2 underline cursor-pointer text-blue-500'
        >
          Reset Filters
        </div>
      </div>

      <div className='space-y-2 flex flex-col'>
        {cuisinesList.map(cuisine => {
          const isSelected = selectedCuisines.includes(cuisine);

          return (
            <div>
              <input
                id={`cuisine_${cuisine}`}
                type='checkbox'
                className='hidden'
                value={cuisine}
                checked={isSelected}
                onChange={handleCuisinesChange}
              />
              <Label
                htmlFor={`cuisine_${cuisine}`}
                className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                  isSelected ? 'border border-green-600 text-green-600' : 'border border-slate-300'
                }`}
              >
                {isSelected && <Check size={20} strokeWidth={3} />}
                {cuisine}
              </Label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CuisineFilter;
