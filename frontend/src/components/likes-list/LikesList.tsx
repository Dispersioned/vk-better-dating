import { Typography } from '@mui/material';
import { ILike } from 'shared/types';

import { DateUser } from './DateUser';
import styles from './styles.module.scss';

type LikesListProps = {
  likes: ILike[];
  expiredLikes: ILike[];
};

export function LikesList({ likes, expiredLikes }: LikesListProps) {
  return (
    <div>
      <Typography variant="h4" align="center">
        Твои лайки ({likes.length})
      </Typography>
      <div className={styles.users}>
        {likes.map((likeMeta) => (
          <DateUser
            key={`${likeMeta.likeUser.name}-${likeMeta.likeUser.extra.hash}`}
            user={likeMeta.likeUser}
            matchUser={likeMeta.matchedUser}
          />
        ))}
      </div>
      <Typography variant="h4" align="center">
        Упущенные/принятые лайки:
      </Typography>
      <div className={styles.users}>
        {expiredLikes.map((likeMeta) => (
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
