import { IVkAuth } from 'shared/types';
import { create } from 'zustand';

type VkStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  authData: IVkAuth | null;
  setAuthData: (authData: IVkAuth | null) => void;
};

export const useAuthStore = create<VkStore>((set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  authData: null,
  setAuthData: (authData) => set({ authData }),
}));
