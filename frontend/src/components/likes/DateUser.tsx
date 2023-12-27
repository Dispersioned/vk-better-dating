import { Typography } from '@mui/material';
import { IRecommendationUserInfo, IUser } from 'shared/types';

import { MatchView } from './MatchView';
import styles from './styles.module.scss';

type DateUserProps = {
  user: IUser;
  match?: IRecommendationUserInfo;
};

export function DateUser({ user, match }: DateUserProps) {
  return (
    <div className={styles.user}>
      <div className={styles.user_header}>
        <div className={styles.header_primary}>
          {match && <MatchView match={match} />}
          <Typography variant="h5">
            {user.name} {match?.user.age}
          </Typography>
        </div>
        {user.is_online && <Typography className={styles.online}>Онлайн</Typography>}
      </div>
      {(() => {
        if (!match) {
          return <img className={styles.user_photo} src={user.photo_url} alt={user.name} />;
        }

        const photoStory = match.user.stories.find((story) => story.type === 'photo');
        if (photoStory) {
          return <img className={styles.user_photo} src={photoStory.large_url} alt={user.name} />;
        }

        const videoStory = match.user.stories.find((story) => story.type === 'video');
        if (videoStory) {
          return <video className={styles.user_photo} src={videoStory.large_url} controls />;
        }

        return <img className={styles.user_photo} src={user.photo_url} alt={user.name} />;
      })()}
    </div>
  );
}
