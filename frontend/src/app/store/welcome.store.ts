import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type WelcomeStore = {
  isPolicyAgreed: boolean;
  setIsPolicyAgreed: (isViewed: boolean) => void;
};

export const useWelcomeStore = create<WelcomeStore>()(
  persist(
    (set) => ({
      isPolicyAgreed: false,
      setIsPolicyAgreed: (isPolicyAgreed) => set((state) => ({ isPolicyAgreed })),
    }),
    {
      name: 'policy-agreed',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
