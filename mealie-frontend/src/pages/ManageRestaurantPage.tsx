import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"

const ManageRestaurantPage = () => {
  return (<ManageRestaurantForm onSave={console.log} isLoading={false} />)
}

export default ManageRestaurantPage;