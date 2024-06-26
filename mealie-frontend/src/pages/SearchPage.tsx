import SearchBar, { SearchForm } from '@/components/SearchBar';

import CuisineFilter from '@/components/CuisineFilter';
import PaginationSelector from '@/components/PaginationSelector';
import SearchResultCard from '@/components/SearchResultCard';
import SearchResultsInfo from '@/components/SearchResultsInfo';
import SortOptionsDropDown from '@/components/SortOptionsDropDown';
import { useParams } from 'react-router-dom';
import { useSearchRestaurants } from '@/api/RestaurantAPI';
import { useState } from 'react';

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: '',
    page: 1,
    selectedCuisines: [],
    sortOption: 'bestMatch',
  });

  const [isCuisinesExpanded, setIsCuisinesExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (seachForm: SearchForm) => {
    setSearchState(prevState => ({
      ...prevState,
      searchQuery: seachForm.searchQuery,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState(prevState => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState(prevState => ({
      ...prevState,
      page,
    }));
  };

  const setSortOption = (selectedSortOption: string) => {
    setSearchState(prevState => ({
      ...prevState,
      sortOption: selectedSortOption,
    }));
  };

  const resetSearch = () => {
    setSearchState(prevState => ({
      ...prevState,
      searchQuery: '',
      page: 1,
    }));
  };

  if (!results?.data || !city) {
    return <div>No results found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisines-list'>
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isCuisinesExpanded}
          onExpandedClick={() => setIsCuisinesExpanded(previousState => !previousState)}
        />
      </div>
      <div id='main-content' className='flex flex-col gap-5'>
        <SearchBar
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
          placeholder='Search by cuisine or restaurant name'
        />

        <div className='flex justify-between flex-col gap-3 lg:flex-row'>
          <SearchResultsInfo total={results.pagination.total} city={city} />
          <SortOptionsDropDown
            onChange={value => setSortOption(value)}
            sortOption={searchState.sortOption}
          />
        </div>

        {results.data.map(restaurant => (
          <SearchResultCard restaurant={restaurant} key={restaurant._id} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
