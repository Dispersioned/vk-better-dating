import { Typography } from '@mui/material';
import { OnlineStatus } from 'components/OnlineStatus';
import { FAMILY_STATE, SPORT_STATE } from 'shared/config/vk';
import { IDateUser } from 'shared/types';
import { renderFromEnum } from 'shared/utils/renderFromEnum';

import styles from './styles.module.scss';

type FeedCardProps = {
  user: IDateUser;
  isMatch: boolean;
};

export function FeedCard({ user, isMatch }: FeedCardProps) {
  return (
    <div className={styles.user} data-recommendationid={user.id}>
      <div className={styles.header}>
        <Typography>
          {user.name} {user.age}
        </Typography>
        <OnlineStatus online={user.is_online} lastOnline={user.last_active_at} />
        <Typography>{user.extra.distance} метров от вас</Typography>
        <Typography>ID: {user.id}</Typography>
        {isMatch && <Typography className={styles.liked_me}>Лайкнул{user.sex === 'female' && 'а'} тебя</Typography>}
      </div>
      <div>
        {user.is_verify && <Typography>Подтвержденный аккаунт</Typography>}
        {user.is_deleted && <Typography color="error">Удаленный аккаунт</Typography>}
        {user.is_blocked && <Typography color="warning">Вы заблокировали этот аккаунт</Typography>}
        {user.is_premium_enabled && <Typography color="info">Премиум акаунт</Typography>}
        <Typography>Работа: {user.form.work}</Typography>
        <Typography>Образование: {user.form.education}</Typography>
        <Typography>Семейное положение: {renderFromEnum(FAMILY_STATE, user.form.family)}</Typography>
        <Typography>О себе: {user.form.about}</Typography>
        <Typography>Знак зодиака: {user.zodiac_sign_id}</Typography>
        <Typography>Интересы: {user.form.interests.join(', ')}</Typography>
        <Typography>Рост: {user.form.height}</Typography>
        <Typography>Музыка: {user.form.music}</Typography>
        <Typography>Фильмы: {user.form.movies}</Typography>
        <Typography>Книги: {user.form.books}</Typography>
        <Typography>Отношение к спорту: {renderFromEnum(SPORT_STATE, user.form.sport)}</Typography>
        <Typography>Цель знакомства: {user.form.target}</Typography>
        <Typography>Лейблы: {user.form.labels.join(', ')}</Typography>
        <Typography>Исполнители (парс вк id): {user.form.artists.join(', ')}</Typography>
        <Typography>
          Исполнители (доп): {user.form_extension.artists.map((artist) => artist.name).join(', ')}
        </Typography>
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
  );
}
