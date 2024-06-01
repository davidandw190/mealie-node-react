import { AppState, Auth0Provider, User } from '@auth0/auth0-react';

import { useCreateUser } from '@/api/UserAPI';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate()

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

  if (!domain || !audience || !clientId  || !redirectUri) {
    throw new Error('Unable to initalize the Auth Provider');
  }

  const onRedirectCallback = () => {
    navigate('/auth');
  }

  return (
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{ redirect_uri: redirectUri }} onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;