import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type WelcomeStore = {
  isViewed: boolean;
  setViewed: (isViewed: boolean) => void;
};

export const useWelcomeStore = create<WelcomeStore>()(
  persist(
    (set) => ({
      isViewed: false,
      setViewed: (isViewed) => set((state) => ({ isViewed })),
    }),
    {
      name: 'viewed',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
