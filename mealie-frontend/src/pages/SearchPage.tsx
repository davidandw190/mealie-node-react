import SearchResultsInfo from '@/components/SearchResultsInfo';
import { useParams } from 'react-router-dom';
import { useSearchRestaurants } from '@/api/RestaurantAPI';

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);


  if (!results?.data || !city) {
    return <div>No results found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
        <div id='cuisines-list'>
            TODO: INSERT CUISINES LIST HERE 
        </div>
        <div id='main-content' className='flex flex-col gap-5'>
            <SearchResultsInfo total={results.pagination.total} city={city} />
        </div>
    </div>
  );
};

export default SearchPage;
