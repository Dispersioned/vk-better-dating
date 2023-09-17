import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TokenStore = {
  vkparams: string | null;
  setParams: (vkparams: string | null) => void;
};

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      vkparams: null,
      setParams: (vkparams) => set({ vkparams }),
    }),
    {
      name: 'token',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
