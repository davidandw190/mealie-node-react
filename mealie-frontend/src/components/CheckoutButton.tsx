import { Dialog, DialogTrigger } from './ui/dialog';
import UserProfileForm, { UserFormData } from '@/forms/user-profile-form/UserProfileForm';

import { Button } from './ui/button';
import { DialogContent } from '@radix-ui/react-dialog';
import LoadingButton from './LoadingButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { useRetrieveAuthenticatedUser } from '@/api/UserAPI';

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
};

const CheckoutButton = ({ onCheckout, disabled }: Props) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className='bg-orange-500 flex-1'>
          Go To Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[425px] md:min-w-[700px] bg-gray-50'>
        <UserProfileForm currentUser={user} onSubmit={onCheckout} isLoading={isGetUserLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
