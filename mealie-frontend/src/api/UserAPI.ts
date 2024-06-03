import { useMutation, useQuery } from 'react-query';

import { toast } from 'sonner';
import { useAuth0 } from '@auth0/auth0-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type CreateUserRequest = {
  auth0_id: string;
  email: string;
};

type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useRetrieveAuthenticatedUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const retrieveAuthenticatedUserRequest = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const { data: user, isLoading, error } = useQuery('fetchAuthenticatedUser', retrieveAuthenticatedUserRequest);

  if (error) {
    console.error(error);
    toast.error(error.toString());
  }
  return {
    user,
    isLoading,
    error,
  };
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }
  };

  const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    error,
    isSuccess,
    reset,
  } = useMutation(updateUserRequest);

  if (isSuccess) {
    toast.success('Profile updated successfully.');
  }

  if (error) {
    console.error(error);
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading, isSuccess };
};
