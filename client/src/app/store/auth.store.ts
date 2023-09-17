import { IVkAuth } from 'shared/types';
import { create } from 'zustand';

type VkStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  authData: IVkAuth | null;
  setAuthData: (authData: IVkAuth) => void;
};

export const useAuthStore = create<VkStore>((set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),
  authData: null,
  setAuthData: (authData) => set({ authData }),
}));
