import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TokenStore = {
  vktoken: string;
  setToken: (vktoken: string) => void;
};

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      vktoken: '',
      setToken: (vktoken) => set((state) => ({ vktoken })),
    }),
    {
      name: 'token',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
