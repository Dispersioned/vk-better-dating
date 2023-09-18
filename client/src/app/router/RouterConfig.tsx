import { Auth } from 'pages/auth';
import { Home } from 'pages/home';
import { SettingsPage } from 'pages/settings-page';
import { IRoute } from 'shared/types';

export const ROUTES = {
  home: '/',
  settings: '/settings',
  auth: '/auth',
} as const;

export const ROUTING: IRoute[] = [
  {
    private: true,
    element: <Home />,
    path: ROUTES.home,
  },
  {
    private: true,
    element: <SettingsPage />,
    path: ROUTES.settings,
  },
  {
    private: false,
    element: <Auth />,
    path: ROUTES.auth,
  },
];
