import { Typography } from '@mui/material';
import { queryClient } from 'shared/api';
import { IDates, IMatchInfo, IProfile } from 'shared/types';
import { getMatchesMap } from 'shared/utils/getMatchesMap';

import { DateUser } from './DateUser';
import styles from './styles.module.scss';

export function Likes() {
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

  const matchesMap = getMatchesMap(matches);

  return (
    <div>
      <Typography variant="h4" align="center">
        Твои лайки
      </Typography>
      <Typography>Всего: {profile.like_to_you_count}</Typography>
      <Typography>Из них не просмотрено: {profile.new_like_to_you_count}</Typography>
      <div className={styles.users}>
        {profile.users.map((user) => (
          <DateUser key={Math.random()} user={user} match={matchesMap[user.photo_url]} />
        ))}
      </div>
    </div>
  );
}
