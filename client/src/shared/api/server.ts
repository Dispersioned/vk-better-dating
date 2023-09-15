import { IDates, IMyself } from 'shared/types';

import { api } from '.';

export async function getLikes(vktoken: string) {
  try {
    const res = await api.post<IMyself>('likes', {
      vktoken,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getDates(vktoken: string) {
  try {
    const res = await api.post<IDates>('recommendations', {
      vktoken,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}
