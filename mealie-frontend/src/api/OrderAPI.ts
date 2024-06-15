import { OrderCheckoutSessionRequest } from '@/types/types';
import { toast } from 'sonner';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const useCreateOrderCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createOrderCheckoutSessionRequest = async (sessionRequest: OrderCheckoutSessionRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/orders/checkout/create-checkout-session`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionRequest),
    });

    if (!response.ok) {
      throw new Error('Failed to create order checkout session');
    }

    return response.json();
  };

  const {
    mutate: createOrderCheckoutSession,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation('createOrderCheckoutSession', createOrderCheckoutSessionRequest);

  if (error) {
    console.error(error);
    toast.error('Failed to create order checkout session');
    reset();
  }

  return { createOrderCheckoutSession, isLoading, isSuccess };
};
