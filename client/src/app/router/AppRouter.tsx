import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { ROUTING } from './RouterConfig';

export function AppRouter() {
  return (
    <Suspense fallback="">
      <Routes>
        {ROUTING.map((route) => (
          <Route key={route.path} element={route.private ? <PrivateRoute guard={route.guard} /> : <PublicRoute />}>
            <Route path={route.path} element={route.element} />
          </Route>
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}
