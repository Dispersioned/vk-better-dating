import { Auth } from 'pages/auth';
import { Home } from 'pages/home';
import { IRoute } from 'shared/types';

export const ROUTES = {
  home: '/',
  auth: '/auth',
} as const;

export const ROUTING: IRoute[] = [
  {
    private: true,
    element: <Home />,
    path: ROUTES.home,
  },
  {
    private: false,
    element: <Auth />,
    path: ROUTES.auth,
  },
];
