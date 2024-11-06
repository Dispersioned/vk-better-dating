import type { AuthSignInResponse } from "./vk/@1.13"

export interface AuthorizedUser {
  data: AuthSignInResponse
  status:  'authorized'
}

export interface UnauthorizedUser {
  data: null
  status: 'unauthorized'
}

export type AppUser = AuthorizedUser | UnauthorizedUser