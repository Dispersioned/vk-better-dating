import type { AppUser, UnauthorizedUser } from '@shared/types/app';
import { create } from 'zustand';

type AuthModel = {
  appUser: AppUser;
  setAppUser: (appUser: AppUser) => void;
};

const ANAUTHORIZED_USER: UnauthorizedUser = {
  data: null, 
  status: 'unauthorized'
}

export const useAuthModel = create<AuthModel>((set) => ({
  appUser: structuredClone(ANAUTHORIZED_USER),
  setAppUser: (appUser) => set({ appUser }),
  logoff: () => set({appUser: structuredClone(ANAUTHORIZED_USER)})
}));
