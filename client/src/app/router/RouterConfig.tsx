import { AuthPage } from 'pages/auth-page';
import { HomePage } from 'pages/home-page';
import { MyLikesPage } from 'pages/my-likes-page';
import { SettingsPage } from 'pages/settings-page';
import { IRoute } from 'shared/types';

export const ROUTES = {
  home: '/',
  settings: '/settings',
  auth: '/auth',
  myLikes: '/my-likes',
} as const;

export const ROUTING: IRoute[] = [
  {
    private: true,
    element: <HomePage />,
    path: ROUTES.home,
  },
  {
    private: true,
    element: <MyLikesPage />,
    path: ROUTES.myLikes,
  },
  {
    private: true,
    element: <SettingsPage />,
    path: ROUTES.settings,
  },
  {
    private: false,
    element: <AuthPage />,
    path: ROUTES.auth,
  },
];
