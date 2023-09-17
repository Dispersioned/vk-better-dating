import { IUserAuth } from 'shared/types'
import { ReactNode } from 'react'

export type Nullable<T> = T | null

type IRouteBase = {
  element: ReactNode
  path: string
}

type IRoutePublic = IRouteBase & {
  private: false
  guard?: never
}

export type IRouteGuard = (user: IUserAuth) => boolean

type IRoutePrivate = IRouteBase & {
  private: true
  guard?: IRouteGuard
}

export type IRoute = IRoutePublic | IRoutePrivate

export type IReactRouterLocationState = null | {
  from?: string
}
