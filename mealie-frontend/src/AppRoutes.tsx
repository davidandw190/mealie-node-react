import { Navigate, Route, Routes } from 'react-router-dom';

import AuthCallbackPage from './pages/AuthCallbackPage';
import HomePage from './pages/HomePage';
import Layout from './layouts/layout';
import ManageRestaurantPage from './pages/ManageRestaurantPage';
import ProtectedRoute from './auth/ProtectedRoute';
import SearchPage from './pages/SearchPage';
import UserProfilePage from './pages/UserProfilePage';

/**
 * AppRoutes component defines all the routes for the application.
 * This component uses React Router for client-side routing.
 *
 * @component
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path='/'
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path='/auth' element={<AuthCallbackPage />} />
      <Route path='/about' element={<span>About Page</span>} />
      <Route
        path='/search/:city'
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path='/details/restaurantId'
        element={
          <Layout>
            <RestaurantDetailsPage />
          </Layout>
        }
      />

      {/* Protected Routes */}
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

      {/* Redirect any unknown routes to home */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
