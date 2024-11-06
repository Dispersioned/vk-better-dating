import { notificationService } from "@shared/services/notificationService"
import type { AppRoute } from "@shared/types/router"
import { AppRoutes } from "../router"

export const authorizedOnlyStrategy: AppRoute['guardStrategy'] = ({ user }) => {
  if (user.status === 'unauthorized') {
    notificationService.error({ description: 'Необходимо авторизоваться' })
    return {
      redirectTo: AppRoutes.AUTH
    }
  }
}