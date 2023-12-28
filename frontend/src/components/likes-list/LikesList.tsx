import { Typography } from '@mui/material';
import { ILike } from 'shared/types';

import { DateUser } from './DateUser';
import styles from './styles.module.scss';

type LikesListProps = {
  likes: ILike[];
};

export function LikesList({ likes }: LikesListProps) {
  return (
    <div>
      <Typography variant="h4" align="center">
        Твои лайки
      </Typography>
      <Typography>Всего: {likes.length}</Typography>
      <div className={styles.users}>
        {likes.map((likeMeta) => (
          <DateUser
            key={`${likeMeta.likeUser.name}-${likeMeta.likeUser.extra.hash}`}
            user={likeMeta.likeUser}
            matchUser={likeMeta.matchedUser}
          />
        ))}
      </div>
    </div>
  );
}
