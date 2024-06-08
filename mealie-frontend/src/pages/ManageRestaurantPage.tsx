import {
  useRegisterRestaurant,
  useRetrieveOwnedRestaurant,
  useUpdateRestaurant,
} from '@/api/RestaurantAPI';

import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';

const ManageRestaurantPage = () => {
  const { ownedRestaurant, isLoading: isFetchLoading } = useRetrieveOwnedRestaurant();
  const { registerRestaurant, isLoading: isRegisterLoading } = useRegisterRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateRestaurant();

  const isEditingExistingRestaurant = !!ownedRestaurant;

  return isFetchLoading ? (
    <div>Loading...</div>
  ) : (
    <ManageRestaurantForm
      onSave={isEditingExistingRestaurant ? updateRestaurant : registerRestaurant}
      isLoading={isRegisterLoading || isUpdateLoading}
      ownedRestaurant={ownedRestaurant}
    />
  );
};

export default ManageRestaurantPage;
