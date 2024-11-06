import type { AppRoute } from "@shared/types/router"
import { AppRoutes } from "../router"

export const publicOnlyStrategy: AppRoute['guardStrategy'] = ({ user }) => {
  if (user.status === 'authorized') {
    return {
      redirectTo: AppRoutes.HOME
    }
  }
}