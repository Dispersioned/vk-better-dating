import { Suspense, useMemo } from 'react';
import { Route, Routes } from "react-router-dom";
import { HistoryRouter } from './HistoryRouter';
import { routerHistory, ROUTING } from './router';
import { RouteWithLifecycle } from './RouteWithLifecycle';
import { useAuthModel } from '@app/model/auth.model';
import { NotFoundPage } from '@pages/NotFoundPage';

export function AppRouter() {
  const appUser = useAuthModel(state => state.appUser)

  const globalParams = useMemo(() => {
    return {
      user: appUser
    }
  }, [appUser])

  return (
    <HistoryRouter history={routerHistory}>
      <Suspense fallback="">
        <Routes>
          {ROUTING.map((route) => (
            <Route
              key={route.path}
              element={<RouteWithLifecycle route={route} globalParams={globalParams} />}
            >
              <Route path={route.path} element={route.element} />
            </Route>
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense >
    </HistoryRouter >
  )
}
