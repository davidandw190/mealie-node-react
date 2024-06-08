import { useRegisterRestaurant, useRetrieveOwnedRestuarant } from '@/api/RestaurantAPI';

import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';

const ManageRestaurantPage = () => {
  const { ownedRestaurant, isLoading: fetchIsLoading } = useRetrieveOwnedRestuarant();
  const { registerRestaurant, isLoading: postIsLoading } = useRegisterRestaurant();

  return <ManageRestaurantForm onSave={registerRestaurant} isLoading={postIsLoading} />;
};

export default ManageRestaurantPage;
