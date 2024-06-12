import SearchBar, { SearchForm } from '@/components/SearchBar';

import SearchResultCard from '@/components/SearchResultCard';
import SearchResultsInfo from '@/components/SearchResultsInfo';
import { useParams } from 'react-router-dom';
import { useSearchRestaurants } from '@/api/RestaurantAPI';
import { useState } from 'react';

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({ searchQuery: '' });
  
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (seachForm: SearchForm) => {
    setSearchState(prevState => ({
      ...prevState,
      searchQuery: seachForm.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState(prevState => ({
      ...prevState,
      searchQuery: '',
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
      
      <div id='cuisines-list'>TODO: INSERT CUISINES LIST HERE</div>
      <div id='main-content' className='flex flex-col gap-5'>
        <SearchBar
          onSubmit={setSearchQuery}
          onReset={resetSearch}
          searchQuery={searchState.searchQuery}
          placeholder='Search by cuisine or restaurant name'
        />
       
        <SearchResultsInfo total={results.pagination.total} city={city} />
        {results.data.map(restaurant => (
          <SearchResultCard restaurant={restaurant} key={restaurant._id} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
