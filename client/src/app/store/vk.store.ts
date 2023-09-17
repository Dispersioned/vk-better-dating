import { getDates, getLikes } from 'shared/api';
import { IDates, IMyself, IVkAuth } from 'shared/types';
import { create } from 'zustand';

import { useAuthStore } from './auth.store';
import { useTokenStore } from './token.store';

type VkStore = {
  isLoading: boolean;
  error: unknown | null;
  dates: IDates | null;
  setDates: (dates: IDates) => void;
  myself: IMyself | null;
  setMyself: (myself: IMyself) => void;
  fetch: () => void;
};

export const useVkStore = create<VkStore>((set, get) => ({
  isLoading: false,
  error: null,
  dates: null,
  myself: null,
  setDates: (dates) => set({ dates }),
  setMyself: (myself) => set({ myself }),
  fetch: async () => {
    if (get().isLoading) return;
    set({ isLoading: true });
    const vktoken = useAuthStore.getState().authData!.token;
    const userId = useAuthStore.getState().authData!.user.vk_id;

    try {
      const myselfApi = await getLikes({ vktoken, userId });
      if (myselfApi) get().setMyself(myselfApi);
      const datesApi = await getDates({ vktoken, userId });
      if (datesApi) get().setDates(datesApi);
    } catch (e) {
      set({ error: e });
    }
    set({ isLoading: false });
  },
}));
