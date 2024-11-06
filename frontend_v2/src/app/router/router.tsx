import { GenericLayout } from "@shared/layouts/AppLayout";
import type { AppRoute } from "@shared/types/router";
import { createBrowserHistory } from "history";
import { authorizedOnlyStrategy } from "./guardStrategy/authorizedOnly.strategy";
import { publicOnlyStrategy } from "./guardStrategy/publicOnly.strategy";

export const routerHistory = createBrowserHistory({ window });

export enum AppRoutes {
  HOME = '/',
  SETTINGS = '/settings',
  MY_LIKES = '/my-likes',
  AUTH = '/auth',
}

// TODO: вынести в компоненты
function HomePage() {
  return (
    <GenericLayout>
      <main>HomePage</main>
    </GenericLayout>
  )
}
function MyLikesPage() {
  return (
    <GenericLayout>
      <main>MyLikesPage</main>
    </GenericLayout>
  )
}
function SettingsPage() {
  return (
    <GenericLayout>
      <main>SettingsPage</main>
    </GenericLayout>
  )
}
function AuthPage() {
  return (
    <GenericLayout>
      <main>AuthPage</main>
    </GenericLayout>
  )
}

export const ROUTING: AppRoute[] = [
  {
    guardStrategy: authorizedOnlyStrategy,
    element: <HomePage />,
    path: AppRoutes.HOME,
  },
  {
    guardStrategy: authorizedOnlyStrategy,
    element: <MyLikesPage />,
    path: AppRoutes.MY_LIKES,
  },
  {
    guardStrategy: authorizedOnlyStrategy,
    element: <SettingsPage />,
    path: AppRoutes.SETTINGS,
  },
  {
    guardStrategy: publicOnlyStrategy,
    element: <AuthPage />,
    path: AppRoutes.AUTH,
  },
];

