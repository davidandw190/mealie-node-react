import { useParams } from 'react-router-dom';

const SearchPage = () => {
  const { city } = useParams();

  return (
    <div>
      <h1>Search Page, city is {city} </h1>
    </div>
  );
};

export default SearchPage;
