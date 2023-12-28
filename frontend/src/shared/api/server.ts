import { IDates, ILikeOrDislikeResponse, IProfile, IVkAuth } from 'shared/types';

import { api } from '.';

type Payload = {
  vktoken: string;
  userId: number;
};

type LikeOrDislikePayload = {
  vktoken: string;
  userId: number;
  recipientId: number;
};

export async function getLikes({ vktoken, userId }: Payload) {
  // todo: перенести в компоненты обработку ошибок
  try {
    const res = await api.post<IProfile>('likes', {
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

export async function login(launchUrl: string) {
  const res = await api.post<IVkAuth>('auth-vk-dating', {
    launchUrl,
  });
  return res.data;
}

export async function like(payload: LikeOrDislikePayload) {
  const res = await api.post<ILikeOrDislikeResponse>('like', payload);
  return res.data;
}

export async function dislike(payload: LikeOrDislikePayload) {
  const res = await api.post<ILikeOrDislikeResponse>('dislike', payload);
  return res.data;
}
