import { getDates, getLikes } from 'shared/api';
import { IDates, IMyself } from 'shared/types';
import { create } from 'zustand';

import { useTokenStore } from './token.store';

type VkStore = {
  dates: IDates | null;
  myself: IMyself | null;
  setDates: (dates: IDates) => void;
  setMyself: (myself: IMyself) => void;
  isLoading: boolean;
  error: unknown | null;
  fetch: () => void;
  // canMatch: sing;
  // setToken: (vktotrken: string) => void;
};

export const useVkStore = create<VkStore>((set, get) => ({
  dates: null,
  myself: null,
  isLoading: false,
  error: null,
  setDates: (dates) => set({ dates }),
  setMyself: (myself) => set({ myself }),
  fetch: async () => {
    set({ isLoading: true });
    const vktoken = useTokenStore.getState().vktoken;

    try {
      const myselfApi = await getLikes(vktoken);
      if (myselfApi) get().setMyself(myselfApi);
      const datesApi = await getDates(vktoken);
      if (datesApi) get().setDates(datesApi);
    } catch (e) {
      set({ error: e });
    }
    set({ isLoading: false });
  },
}));
