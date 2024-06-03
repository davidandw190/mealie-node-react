import { useRetrieveAuthenticatedUser, useUpdateUser } from '@/api/UserAPI';

import UserProfileForm from '@/forms/user-profile-form/UserProfileForm';

const UserProfilePage: React.FC = () => {
  const { user, isLoading: isFetchLoading } = useRetrieveAuthenticatedUser(); 
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

  if (isFetchLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error occured</div>;
  }

  return <UserProfileForm currentUser={user} onSubmit={updateUser} isLoading={isUpdateLoading} />;
};

export default UserProfilePage;
