import { Navigate, Route, Routes } from 'react-router-dom';

import AuthCallbackPage from './pages/AuthCallbackPage';
import HomePage from './pages/HomePage';
import Layout from './layouts/layout';
import UserProfileForm from './user-profile-form/UserProfileForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/auth" element={<AuthCallbackPage />} />
      <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
      <Route path="/about" element={<span>About Page</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
