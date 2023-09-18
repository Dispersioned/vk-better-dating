import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Typography } from '@mui/material';
import { toastService } from 'shared/services/toast.service';
import { IDateUser, IUser } from 'shared/types';

import styles from './styles.module.scss';

type DateUserProps = {
  user: IUser;
  match?: IDateUser;
};

export function DateUser({ user, match }: DateUserProps) {
  const onViewMatch = () => {
    if (!match) return;

    const matchCardAnchor = document.querySelector(`[data-recommendationId="${match.id}"]`);

    if (!matchCardAnchor) toastService.error(`Такой анкеты нет в ленте`);
    matchCardAnchor?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.user}>
      <div className={styles.user_header}>
        <div className={styles.header_primary}>
          {match && (
            <IconButton onClick={onViewMatch}>
              <VisibilityIcon />
            </IconButton>
          )}
          <Typography variant="h5">
            {user.name} {match?.age}
          </Typography>
        </div>
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
