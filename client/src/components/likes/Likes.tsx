import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { IMyself } from 'shared/types';

import styles from './styles.module.scss';

type LikesProps = {
  myself: IMyself;
};

export function Likes({ myself }: LikesProps) {
  return (
    <div>
      <Typography variant="h4" align="center">
        Твои лайки
      </Typography>
      <Typography>Всего: {myself.like_to_you_count}</Typography>
      <Typography>Из них не просмотрено: {myself.new_like_to_you_count}</Typography>
      <div className={styles.users}>
        {myself.users.map((user) => (
          <div className={styles.user} key={Math.random()}>
            <div className={styles.user_header}>
              <Typography variant="h5">{user.name}</Typography>
              {user.is_online && <Typography className={styles.online}>Онлайн</Typography>}
            </div>
            <img className={styles.user_photo} src={user.photo_url} alt={user.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
