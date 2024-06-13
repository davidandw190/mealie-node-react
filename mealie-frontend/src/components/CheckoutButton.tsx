import { Button } from './ui/button';
import LoadingButton from './LoadingButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { useRetrieveAuthenticatedUser } from '@/api/UserAPI';

const CheckoutButton = () => {
  const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();
  const { user, isLoading: isGetUserLoading } = useRetrieveAuthenticatedUser();

  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className='bg-orange-500 flex-1'>
        Log in to check out
      </Button>
    );
  }

  if (isAuthLoading || !user || isGetUserLoading) {
    return <LoadingButton />;
  }
};

export default CheckoutButton;
