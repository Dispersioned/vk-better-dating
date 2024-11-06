import type { AppRoutes } from "@app/router/router"
import type { AppUser } from "./app"
import type { ReactNode } from "react"

export interface RouterExtraParams {
  user: AppUser
}

export interface AppRoute {
  guardStrategy?: (params: RouterExtraParams) => void | {redirectTo: string}
  path: AppRoutes
  element: ReactNode
}