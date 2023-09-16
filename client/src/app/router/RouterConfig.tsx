import { Home } from 'pages/home';
import { IRoute } from 'shared/types';

export const ROUTES = {
  home: '/',
} as const;

export const ROUTING: IRoute[] = [
  {
    private: true,
    element: <div>private</div>,
    path: '/private',
  },
  {
    private: false,
    element: <Home />,
    path: ROUTES.home,
  },
];
