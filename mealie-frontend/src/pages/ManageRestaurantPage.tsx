import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm';
import { useRegisterRestaurant } from '@/api/RestaurantAPI';

const ManageRestaurantPage = () => {
  const { registerRestaurant, isLoading } = useRegisterRestaurant();

  return <ManageRestaurantForm onSave={registerRestaurant} isLoading={isLoading} />;
};

export default ManageRestaurantPage;
