import { Restaurant, RestaurantSearchResponse } from '../types/types';
import { useMutation, useQuery } from 'react-query';

import { toast } from 'sonner';
import { useAuth0 } from '@auth0/auth0-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useRetrieveOwnedRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const retrieveOwnedRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/restaurants/owned`, {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve owned restaurant');
    }

    return response.json();
  };

  const {
    data: ownedRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useQuery('fetchOwnedRestaurant', retrieveOwnedRestaurantRequest);

  if (error) {
    console.error(error);
    toast.error('Failed to retrieve owned restaurant');
  }

  return { ownedRestaurant, isLoading, isSuccess };
};

export const useRegisterRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/restaurants/owned`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error('Failed to create restaurant');
    }

    return response.json();
  };

  const {
    mutate: registerRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createRestaurantRequest);

  if (error) {
    console.error(error);
    toast.error('Failed to update restaurant');
  }

  return { registerRestaurant, isLoading, isSuccess };
};

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/restaurants/owned`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error('Failed to update restaurant');
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateRestaurantRequest);

  if (error) {
    console.error(error);
    toast.error('Failed to update restaurant');
  }

  return { updateRestaurant, isLoading, isSuccess };
};

export const useSearchRestaurants = (city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurants/search/${city}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to search for restaurants');
    }

    return response.json();
  };

  const {
    data: results,
    isLoading,
    isSuccess,
    error,
  } = useQuery(['searchRestaurants'], createSearchRequest, { enabled: !!city });

  if (error) {
    console.error(error);
    toast.error('Failed to search for restaurants');
  }

  return { results, isLoading, isSuccess };
};
