import { Navigate, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Layout from './layouts/layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/user-profile" element={<span>User Profile Page</span>} />
      <Route path="/about" element={<span>About Page</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;