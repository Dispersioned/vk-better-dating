import { IFeed, IFeedUser, ILike, ILikeUser, IVkAuth } from 'shared/types';

import { api } from '.';

type LikeOrDislikePayload = {
  vktoken: string;
  userId: number;
  recipientId: number;
};

type LikeOrDislikeResponse = {
  userId: number;
  isMatchMissed: boolean;
  date: number;
};

type GetRecommendationPayload = {
  token: string;
  VKID: string | number;
};

type GetRecommendationResponse = {
  feed: IFeed;
  likes: ILike[];
  expiredLikes: ILike[];
};

export async function getRecommendations({ token, VKID }: GetRecommendationPayload) {
  try {
    const res = await api.post<GetRecommendationResponse>('get-recommendations', {
      token,
      VKID,
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
  const res = await api.post<LikeOrDislikeResponse>('like', payload);
  return res.data;
}

export async function dislike(payload: LikeOrDislikePayload) {
  const res = await api.post<LikeOrDislikeResponse>('dislike', payload);
  return res.data;
}
