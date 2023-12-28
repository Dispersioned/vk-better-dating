import { Typography } from '@mui/material';
import { IFeed, ILike } from 'shared/types';

import { FeedCard } from './FeedCard';
import styles from './styles.module.scss';

type DatesProps = {
  feed: IFeed;
  likes: ILike[];
};

export function Dates({ feed, likes }: DatesProps) {
  const matchedUsersIds = likes.filter((meta) => !!meta.matchedUser).map((meta) => meta.matchedUser.id);

  return (
    <div className={styles.layout}>
      <Typography variant="h4" align="center">
        Анкеты ({feed.users.length}) Лайков доступно: {feed.remaining}
      </Typography>
      <div className={styles.users}>
        {feed.users.map((feedUser) => (
          <FeedCard key={feedUser.id} user={feedUser} isMatch={matchedUsersIds.includes(feedUser.id)} />
        ))}
      </div>
    </div>
  );
}
