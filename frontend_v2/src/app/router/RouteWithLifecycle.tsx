import type { AppUser } from "@shared/types/app"
import type { AppRoute } from "@shared/types/router"
import { Navigate, Outlet } from "react-router-dom"

type RouteWithLifecycleProps = {
  route: AppRoute
  globalParams: {
    user: AppUser
  }
}

export function RouteWithLifecycle({ route, globalParams }: RouteWithLifecycleProps) {
  const guardResult = route.guardStrategy?.(globalParams)

  if (guardResult) {
    return <Navigate to={guardResult.redirectTo} />
  }

  return <Outlet />;
}
