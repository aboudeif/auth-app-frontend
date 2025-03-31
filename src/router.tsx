import { createBrowserRouter } from 'react-router-dom';
import { Application, Login, Logout, Signup } from './pages';

import { routeLinks, RoutesEnum } from './enums';
import { Unauthorized } from './components';
import { ProtectedRoute } from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute requireAuth={false}>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: routeLinks[RoutesEnum.LOGIN],
    element: (
      <ProtectedRoute requireAuth={false}>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: routeLinks[RoutesEnum.SIGNUP],
    element: (
      <ProtectedRoute requireAuth={false}>
        <Signup />
      </ProtectedRoute>
    ),
  },
  {
    path: routeLinks[RoutesEnum.LOGOUT],
    element: (
      <ProtectedRoute requireAuth={true}>
        <Logout />
      </ProtectedRoute>
    ),
    errorElement: <Login />
  },
  {
    path: routeLinks[RoutesEnum.APPLICATION],
    element: (
      <ProtectedRoute requireAuth={true}>
        <Application />
      </ProtectedRoute>
    ),
    errorElement: <Unauthorized />,
  },
]);