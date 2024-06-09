import { Navigate, Route, Routes } from 'react-router-dom';

import AuthCallbackPage from './pages/AuthCallbackPage';
import HomePage from './pages/HomePage';
import Layout from './layouts/layout';
import ManageRestaurantPage from './pages/ManageRestaurantPage';
import ProtectedRoute from './auth/ProtectedRoute';
import SearchPage from './pages/SearchPage';
import UserProfilePage from './pages/UserProfilePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path='/auth' element={<AuthCallbackPage />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path='/user-profile'
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />

        <Route
          path='/manage-restaurant'
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
      </Route>

      <Route
        path='/search/:city'
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      ></Route>

      <Route path='/about' element={<span>About Page</span>} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
