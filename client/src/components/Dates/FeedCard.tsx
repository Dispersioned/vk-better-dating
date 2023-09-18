import { Chip, Typography } from '@mui/material';
import { OnlineStatus } from 'components/OnlineStatus';
import { DATE_TARGET_STATE, FAMILY_STATE, INTERESTS_STATE, SPORT_STATE, ZODIAC_SIGN_STATE } from 'shared/config/vk';
import { IDateUser } from 'shared/types';
import { renderFromEnum } from 'shared/utils/renderFromEnum';

import styles from './styles.module.scss';

type FeedCardProps = {
  user: IDateUser;
  isMatch: boolean;
};

export function FeedCard({ user, isMatch }: FeedCardProps) {
  const sortedInterests = [...user.form.interests];
  sortedInterests.sort();

  return (
    <div className={styles.user} data-recommendationid={user.id}>
      <div className={styles.header}>
        {isMatch && <Typography className={styles.liked_me}>Лайкнул{user.sex === 'female' && 'а'} тебя</Typography>}
        {user.is_deleted && <Typography color="error">Удаленный аккаунт</Typography>}
        {user.is_blocked && <Typography color="error">Вы заблокировали этот аккаунт</Typography>}
        {user.is_premium_enabled && <Typography className={styles.user_premium}>Премиум акаунт</Typography>}
        {user.is_verify && <Typography className={styles.user_verified}>Подтвержденный аккаунт</Typography>}
        <Typography>
          {user.name} {user.age}
        </Typography>
        <OnlineStatus online={user.is_online} lastOnline={user.last_active_at} />
        <Typography>{user.extra.distance} метров от вас</Typography>
        <Typography>ID: {user.id}</Typography>
      </div>
      <div className={styles.info}>
        <div className={styles.info_primary}>
          <div>
            <Typography>Цель знакомства: {user.form.target}</Typography>
            <Typography>Семейное положение: {renderFromEnum(FAMILY_STATE, user.form.family)}</Typography>
            <Typography>О себе: {user.form.about}</Typography>
            <div className={styles.interests}>
              <Typography>Интересы:</Typography>
              <div className={styles.interests_list}>
                {renderFromEnum(INTERESTS_STATE, sortedInterests, {
                  render: (text) => <Chip key={text} className={styles.interests_chip} label={text} />,
                })}
              </div>
            </div>
            <Typography>Рост: {user.form.height}</Typography>
          </div>
          <div className={styles.info_primary_B}>
            <Typography>Знак зодиака: {renderFromEnum(ZODIAC_SIGN_STATE, user.zodiac_sign_id)}</Typography>
            <Typography>Работа: {user.form.work}</Typography>
            <Typography>Образование: {user.form.education}</Typography>
            <Typography>Отношение к спорту: {renderFromEnum(SPORT_STATE, user.form.sport)}</Typography>
          </div>
        </div>
        <Typography>Музыка: {user.form.music}</Typography>
        <Typography>Фильмы: {user.form.movies}</Typography>
        <Typography>Книги: {user.form.books}</Typography>
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
