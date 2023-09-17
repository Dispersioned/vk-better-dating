import { IDates, IMyself, IVkAuth } from 'shared/types';

import { api } from '.';

export async function getLikes(vktoken: string) {
  // todo: перенести в компоненты обработку ошибок
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
  // todo: перенести в компоненты обработку ошибок
  try {
    const res = await api.post<IDates>('recommendations', {
      vktoken,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function login(params: string) {
  const res = await api.post<IVkAuth>('auth-vk-dating', {
    authParams: params,
  });
  return res.data;
}
