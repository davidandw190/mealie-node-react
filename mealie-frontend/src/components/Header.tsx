import { Link } from 'react-router-dom';
import MainNav from './MainNav';
import MobileNav from './MobileNav';

const Header: React.FC = () => {
  return (
    <div className='border-b-2 border-b-orange-500 py-6'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='text-3x1 font-bold tracking-tight text-orange-500'>
          Mealie.io
        </Link>
        <div className='md:hidden'>
          <MobileNav />
        </div>
        <div className='hidden md:block'>
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
