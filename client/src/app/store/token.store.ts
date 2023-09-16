import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TokenStore = {
  vkparams: string;
  setParams: (vkparams: string) => void;
  vktoken: string;
  setToken: (vktoken: string) => void;
};

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      vkparams: '',
      setParams: (vkparams) => set((state) => ({ vkparams })),
      vktoken: '',
      setToken: (vktoken) => set((state) => ({ vktoken })),
    }),
    {
      name: 'token',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
