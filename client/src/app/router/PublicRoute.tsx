import { Navigate, Outlet } from 'react-router-dom'

export function PublicRoute() {
  // const user = useTypeSelector((state) => state.auth.user)
  const user = null

  if (user) return <Navigate to="/" />

  return <Outlet />
}
