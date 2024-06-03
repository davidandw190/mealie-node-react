import { updateUser } from '../../../mealie-backend/src/resources/user.resource';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';

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

  if (error) {
    console.error(error);
    reset();
  }

  return { updateUser, isLoading };
};
