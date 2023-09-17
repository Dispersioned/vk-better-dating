import { IDates, IMyself, IVkAuth } from 'shared/types';

import { api } from '.';

type Payload = {
  vktoken: string;
  userId: number;
};

export async function getLikes({ vktoken, userId }: Payload) {
  // todo: перенести в компоненты обработку ошибок
  try {
    const res = await api.post<IMyself>('likes', {
      vktoken,
      userId,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getDates({ vktoken, userId }: Payload) {
  // todo: перенести в компоненты обработку ошибок
  try {
    const res = await api.post<IDates>('recommendations', {
      vktoken,
      userId,
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
