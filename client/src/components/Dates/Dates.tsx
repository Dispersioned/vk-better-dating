import { Typography } from '@mui/material';
import { useVkStore } from 'app/store/vk.store';
import { IDates } from 'shared/types';

import { FeedCard } from './FeedCard';
import styles from './styles.module.scss';

type DatesProps = {
  dates: IDates;
};

export function Dates({ dates }: DatesProps) {
  const { matches } = useVkStore();

  if (!matches) return null;

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
