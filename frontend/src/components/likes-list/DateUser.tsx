import { Typography } from '@mui/material';
import { IFeedUser, ILikeUser } from 'shared/types';

import { MatchView } from './MatchView';
import styles from './styles.module.scss';

type DateUserProps = {
  user: ILikeUser;
  matchUser: IFeedUser | null;
};

export function DateUser({ user, matchUser }: DateUserProps) {
  return (
    <div className={styles.user}>
      <div className={styles.user_header}>
        <div className={styles.header_primary}>
          {matchUser && <MatchView match={matchUser} />}
          <Typography variant="h5">
            {user.name} {matchUser?.age}
          </Typography>
        </div>
        {user.is_online && <Typography className={styles.online}>Онлайн</Typography>}
      </div>
      {(() => {
        if (!matchUser) {
          return <img className={styles.user_photo} src={user.photo_url} alt={user.name} />;
        }

        const photoStory = matchUser.stories.find((story) => story.type === 'photo');
        if (photoStory) {
          return <img className={styles.user_photo} src={photoStory.large_url} alt={user.name} />;
        }

        const videoStory = matchUser.stories.find((story) => story.type === 'video');
        if (videoStory) {
          return <video className={styles.user_photo} src={videoStory.large_url} controls />;
        }

        return <img className={styles.user_photo} src={user.photo_url} alt={user.name} />;
      })()}
    </div>
  );
}
