import { useRetrieveAuthenticatedUser, useUpdateUser } from '@/api/UserAPI';

import UserProfileForm from '@/forms/user-profile-form/UserProfileForm';

const UserProfilePage: React.FC = () => {
  const { user, isLoading: isFetchLoading, error } = useRetrieveAuthenticatedUser(); 
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

  if (isFetchLoading) {
    return <div>Loading...</div>;
  }

  return <UserProfileForm onSubmit={updateUser} isLoading={isLoading} />;
};

export default UserProfilePage;
