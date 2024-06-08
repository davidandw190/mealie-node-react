import React, { useMemo } from 'react';
import {
  useRegisterRestaurant,
  useRetrieveOwnedRestaurant,
  useUpdateRestaurant,
} from '@/api/RestaurantAPI';

import ClipLoader from 'react-spinners/ClipLoader';
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';

const ManageRestaurantPage = React.memo(function ManageRestaurantPage() {
  const { ownedRestaurant, isLoading: isFetchLoading } = useRetrieveOwnedRestaurant();
  const { registerRestaurant, isLoading: isRegisterLoading } = useRegisterRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateRestaurant();

  const isEditingExistingRestaurant = useMemo(() => !!ownedRestaurant, [ownedRestaurant]);

  if (isFetchLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={25} color={'#244abc'} loading={true} />
      </div>
    );
  }

  return (
    <ManageRestaurantForm
      onSave={isEditingExistingRestaurant ? updateRestaurant : registerRestaurant}
      isLoading={isRegisterLoading || isUpdateLoading}
      ownedRestaurant={ownedRestaurant}
    />
  );
});

export default ManageRestaurantPage;
