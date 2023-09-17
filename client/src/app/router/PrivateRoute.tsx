import { useAuthStore } from 'app/store/auth.store';
import { BaseLayout } from 'components/base/base-layout';
import { useLayoutEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IReactRouterLocationState, IRouteGuard } from 'shared/types';

import { ROUTES } from './RouterConfig';

type PrivateRouteProps = {
  guard?: IRouteGuard;
};

export function PrivateRoute({ guard }: PrivateRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { authData } = useAuthStore();
  const user = authData;

  const [hasAccess, setHasAccess] = useState(false);

  useLayoutEffect(() => {
    if (!user) return;
    if (!guard || guard(user)) {
      setHasAccess(true);
      return;
    }

    const from = (location.state as IReactRouterLocationState)?.from;
    navigate(from || ROUTES.home);
    setHasAccess(true);
  }, [setHasAccess, guard, user, location.state, navigate]);

  if (!user) return <Navigate to="auth" />;

  if (!hasAccess) return <BaseLayout />;

  return <Outlet />;
}
