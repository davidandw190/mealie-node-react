import { Restaurant } from "../types/types";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useRegisterRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    
    const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
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

  const { mutate: registerRestaurant, isLoading, isSuccess, error} = useMutation(createRestaurantRequest);

  if (error) {
    console.error(error);
    toast.error('Failed to update restaurant');
  }

  return { registerRestaurant, isLoading, isSuccess };
}