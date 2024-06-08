import { useRegisterRestaurant, useRetrieveOwnedRestaurant } from '@/api/RestaurantAPI';

import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';

const ManageRestaurantPage = () => {
  const { ownedRestaurant, isLoading: fetchIsLoading } = useRetrieveOwnedRestaurant();
  const { registerRestaurant, isLoading: postIsLoading } = useRegisterRestaurant();

  return fetchIsLoading ? (
    <div>Loading...</div>
  ) : (
    <ManageRestaurantForm
      onSave={registerRestaurant}
      isLoading={postIsLoading}
      ownedRestaurant={ownedRestaurant}
    />
  );
};

export default ManageRestaurantPage;
