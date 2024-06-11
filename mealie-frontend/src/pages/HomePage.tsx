import SearchBar, { SearchForm } from '@/components/SearchBar';

import appDownloadImage from '../assets/appDownload.png';
import landingImage from '../assets/landing.png';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (searchFormData: SearchForm) => {
    navigate({ pathname: `/search/${searchFormData.searchQuery}` });
  };

  return (
    <div className='flex flex-col gap-12'>
      <div className='md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'>
        <h1 className='text-5xl font-bold tracking-tight text-orange-600'>
          Tuck into a takeaway today
        </h1>
        <span className='text-x1'>Food is just one click away!</span>
        <SearchBar placeholder='Search by City or Town' onSubmit={handleSubmit} />
      </div>
      <div className='grid md:grid-cols-2 gap-5'>
        <img src={landingImage} />
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <span className='font-bold text-3x1 tracking-tighter'>Order takeaway even faster!</span>
          <span>Download the Mealie App for faster ordering and personalised recommendations</span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
