import { Typography } from '@mui/material';
import { useVkStore } from 'app/store/vk.store';
import { IMyself } from 'shared/types';
import { getMatchesMap } from 'shared/utils/getMatchesMap';

import { DateUser } from './DateUser';
import styles from './styles.module.scss';

type LikesProps = {
  myself: IMyself;
};

export function Likes({ myself }: LikesProps) {
  const { matches } = useVkStore();

  if (!matches) return null;

  const matchesMap = getMatchesMap(matches);

  return (
    <div>
      <Typography variant="h4" align="center">
        Твои лайки
      </Typography>
      <Typography>Всего: {myself.like_to_you_count}</Typography>
      <Typography>Из них не просмотрено: {myself.new_like_to_you_count}</Typography>
      <div className={styles.users}>
        {myself.users.map((user) => (
          <DateUser key={Math.random()} user={user} match={matchesMap[user.photo_url]} />
        ))}
      </div>
    </div>
  );
}
