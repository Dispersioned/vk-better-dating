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
      <img className={styles.user_photo} src={user.photo_url} alt={user.name} />
    </div>
  );
}
