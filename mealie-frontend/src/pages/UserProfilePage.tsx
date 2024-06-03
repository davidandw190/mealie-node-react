import UserProfileForm from '@/forms/user-profile-form/UserProfileForm';
import { useUpdateUser } from '@/api/UserAPI';

const UserProfilePage: React.FC = () => {
  const { updateUser, isLoading } = useUpdateUser();

  return <UserProfileForm onSubmit={updateUser} isLoading={isLoading} />;
};

export default UserProfilePage;
