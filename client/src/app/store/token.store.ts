import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TokenStore = {
  vkparams: string;
  setParams: (vkparams: string) => void;
};

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      vkparams: '',
      setParams: (vkparams) => set((state) => ({ vkparams })),
    }),
    {
      name: 'token',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
