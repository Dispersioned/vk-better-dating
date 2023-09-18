import { Typography } from '@mui/material';
import { IDateUser, IMatchInfo, IUser } from 'shared/types';

import styles from './styles.module.scss';

type DateUserProps = {
  user: IUser;
  match?: IDateUser;
};

export function DateUser({ user, match }: DateUserProps) {
  console.log('match', match);
  return (
    <div className={styles.user}>
      <div className={styles.user_header}>
        <Typography variant="h5">{user.name}</Typography>
        {user.is_online && <Typography className={styles.online}>Онлайн</Typography>}
      </div>
      {(() => {
        if (!match) {
          return <img className={styles.user_photo} src={user.photo_url} alt={user.name} />;
        }

        const photoStory = match.stories.find((story) => story.type === 'photo');
        if (photoStory) {
          return <img className={styles.user_photo} src={photoStory.large_url} alt={user.name} />;
        }

        const videoStory = match.stories.find((story) => story.type === 'video');
        if (videoStory) {
          return <video className={styles.user_photo} src={videoStory.large_url} controls />;
        }

        return <img className={styles.user_photo} src={user.photo_url} alt={user.name} />;
      })()}
    </div>
  );
}
