import { IDates, IMatchInfo, IProfile } from 'shared/types';
import { create } from 'zustand';

type VkStore = {
  matches: IMatchInfo[] | null;
  updateMatches: (profile: IProfile, dates: IDates) => void;
};

export const useVkStore = create<VkStore>((set, get) => ({
  // TODO: написать сайд эффект в query client чтобы обновлять эти данные либо сделать это в кастомном хуке
  matches: null,
  updateMatches: (profile, dates) => {
    const matches: IMatchInfo[] = [];
    const peopleWhoLikedMePhotoUrls = profile.users.map((userInfo) => userInfo.user.photo_url);

    dates.users.forEach((recommendation) => {
      const personBlurredPhotoUrls = recommendation.user.stories.map((story) => story.blur_url);

      personBlurredPhotoUrls.forEach((url) => {
        if (peopleWhoLikedMePhotoUrls.includes(url)) {
          matches.push({
            user: recommendation,
            matchedByUrl: url,
          });
        }
      });
    });

    set({ matches });
  },
}));
