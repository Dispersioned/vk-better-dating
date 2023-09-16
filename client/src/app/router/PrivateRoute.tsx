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

  // const { notifyError } = useActions()
  // const user = useTypeSelector((state) => state.auth.user)
  const user = null;

  const [hasAccess, setHasAccess] = useState(false);

  useLayoutEffect(() => {
    if (!user) return;
    if (!guard || guard(user)) {
      setHasAccess(true);
      return;
    }

    // notifyError(t('error/no access'))
    const from = (location.state as IReactRouterLocationState)?.from;
    navigate(from || ROUTES.home);
    setHasAccess(true);
  }, [setHasAccess, guard, user, location.state, navigate]);

  if (!user) return <Navigate to="login" />;

  if (!hasAccess) return <BaseLayout />;

  return <Outlet />;
}
