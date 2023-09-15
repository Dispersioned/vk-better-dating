import { Typography } from '@mui/material';
import { OnlineStatus } from 'components/OnlineStatus';
import { format } from 'date-fns';
import { IDates } from 'shared/types';

import styles from './styles.module.scss';

type DatesProps = {
  dates: IDates;
};

export function Dates({ dates }: DatesProps) {
  return (
    <div className={styles.layout}>
      <Typography variant="h4" align="center">
        Анкеты ({dates.users.length}) Лайков доступно: {dates.remaining}
      </Typography>
      <div className={styles.users}>
        {dates.users.map((user) => (
          <div className={styles.user} key={user.id}>
            <div className={styles.header}>
              <Typography>
                {user.name} {user.age}
              </Typography>
              <OnlineStatus online={user.is_online} lastOnline={user.last_active_at} />
            </div>
            <div className={styles.images}>
              {user.stories.map((story) => (
                <div className={styles.story} key={story.media_index}>
                  <div>
                    {story.type === 'video' && <img className={styles.story_media} src={story.blur_url} />}
                    {story.type === 'photo' && <img className={styles.story_media} src={story.blur_url} />}
                  </div>
                  <div>
                    {story.type === 'video' && (
                      <video className={styles.story_media} src={story.video_large_url} controls></video>
                    )}
                    {story.type === 'photo' && <img className={styles.story_media} src={story.large_url} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
