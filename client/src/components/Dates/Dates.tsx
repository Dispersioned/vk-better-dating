import { Typography } from '@mui/material';
import { queryClient } from 'shared/api';
import { IDates, IMatchInfo, IProfile } from 'shared/types';

import { FeedCard } from './FeedCard';
import styles from './styles.module.scss';

export function Dates() {
  const dates = queryClient.getQueryData<IDates>(['dates']);
  const profile = queryClient.getQueryData<IProfile>(['profile']);

  if (!dates || !profile) return null;

  /*
  TODO: todo вынести куда-нибудь скорее всегда в стор
  TODO: данная логика переиспользуется, вынести в хук
  */
  const matches: IMatchInfo[] = [];
  const peopleWhoLikedMePhotoUrls = profile.users.map((user) => user.photo_url);

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

  const matchedUserIds = matches.map((match) => match.user.id);

  return (
    <div className={styles.layout}>
      <Typography variant="h4" align="center">
        Анкеты ({dates.users.length}) Лайков доступно: {dates.remaining}
      </Typography>
      <div className={styles.users}>
        {dates.users.map((recommendation) => (
          <FeedCard
            key={recommendation.id}
            user={recommendation.user}
            isMatch={matchedUserIds.includes(recommendation.user.id)}
          />
        ))}
      </div>
    </div>
  );
}
