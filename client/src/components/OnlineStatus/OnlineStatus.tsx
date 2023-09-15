import { Typography } from '@mui/material';
import { format } from 'date-fns';

import styles from './styles.module.scss';

type OnlineStatusProps = {
  online: boolean;
  lastOnline: string;
};

export function OnlineStatus({ online, lastOnline }: OnlineStatusProps) {
  if (online) {
    return <Typography className={styles.online}>Онлайн</Typography>;
  }

  return <Typography color="#888">Последний онлайн {format(new Date(lastOnline), 'hh:mm dd MMMM yyyy')}</Typography>;
}
