import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Chip, IconButton, Typography } from '@mui/material';
import { useAuthStore } from 'app/store/auth.store';
import { OnlineStatus } from 'components/OnlineStatus';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { dislike, like } from 'shared/api';
import {
  ALCOHOL_STATE,
  DATE_TARGET_STATE,
  FAMILY_STATE,
  INTERESTS_STATE,
  KIDS_STATE,
  SMOKING_STATE,
  SPORT_STATE,
  ZODIAC_SIGN_STATE,
} from 'shared/config/vk';
import { toastService } from 'shared/services/toast.service';
import { IFeedUser } from 'shared/types';
import { getAxiosErrorMessage } from 'shared/utils/getAxiosErrorMessage';
import { renderFromEnum } from 'shared/utils/renderFromEnum';

import { Location } from './Location';
import styles from './UserCard.module.scss';

type UserCardProps = {
  user: IFeedUser;
  isMatch: boolean;
};

export function UserCard({ user, isMatch }: UserCardProps) {
  const { authData } = useAuthStore();
  const sortedInterests = [...user.form.interests];
  sortedInterests.sort();

  if (!authData) return null;

  const onLike = async () => {
    try {
      const res = await like({
        userId: authData.user.vk_id,
        recipientId: user.id,
        vktoken: authData.token,
      });
      console.log('res', res);
      toastService.success('Лайк засчитан!');
    } catch (e) {
      const msg = getAxiosErrorMessage(e);
      toastService.error(msg || 'Не удалось лайкнуть');
    }
  };

  const onDislike = async () => {
    try {
      const res = await dislike({
        userId: authData.user.vk_id,
        recipientId: user.id,
        vktoken: authData.token,
      });
      console.log('res', res);
      toastService.success('Дизлайк засчитан!');
    } catch (e) {
      const msg = getAxiosErrorMessage(e);
      toastService.error(msg || 'Не удалось дизлайкнуть');
    }
  };

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
        <Location distanceMeters={user.extra.distance} canBeHidden={user.is_premium_enabled} />
        <Typography>ID: {user.id}</Typography>
        <IconButton onClick={onLike}>
          <ThumbUpIcon color="success" className={styles.icon_button} />
        </IconButton>
        <IconButton onClick={onDislike}>
          <ThumbDownIcon color="error" className={styles.icon_button} />
        </IconButton>
      </div>
      <div className={styles.info}>
        <div className={styles.info_primary}>
          <div>
            <Typography>
              <Typography color="#888" component="span">
                Цель знакомства:
              </Typography>{' '}
              {renderFromEnum(DATE_TARGET_STATE, user.form.target)}
            </Typography>
            <Typography>
              <Typography color="#888" component="span">
                Семейное положение:
              </Typography>{' '}
              {renderFromEnum(FAMILY_STATE, user.form.family)}
            </Typography>
            <Typography>
              <Typography color="#888" component="span">
                Дети:
              </Typography>{' '}
              {renderFromEnum(KIDS_STATE, user.form.kids)}
            </Typography>
            <Typography>
              <Typography color="#888" component="span">
                О себе:
              </Typography>{' '}
              {user.form.about}
            </Typography>
            <div className={styles.interests}>
              <Typography color="#888">Интересы:</Typography>
              <div className={styles.interests_list}>
                {renderFromEnum(INTERESTS_STATE, sortedInterests, {
                  render: (text) => <Chip key={text} className={styles.interests_chip} label={text} />,
                })}
              </div>
            </div>
            <Typography>
              <Typography color="#888" component="span">
                Рост:
              </Typography>{' '}
              {user.form.height}
            </Typography>
          </div>
          <div className={styles.info_primary_B}>
            <Typography>
              <Typography color="#888" component="span">
                Знак зодиака:
              </Typography>{' '}
              {renderFromEnum(ZODIAC_SIGN_STATE, user.zodiac_sign_id)}
            </Typography>
            <Typography>
              <Typography color="#888" component="span">
                Работа:
              </Typography>{' '}
              {user.form.work}
            </Typography>
            <Typography>
              <Typography color="#888" component="span">
                Образование:
              </Typography>{' '}
              {user.form.education}
            </Typography>
            <Typography>
              <Typography color="#888" component="span">
                Спорт:
              </Typography>{' '}
              {renderFromEnum(SPORT_STATE, user.form.sport)}
            </Typography>
            <Typography>
              <Typography color="#888" component="span">
                Курение:
              </Typography>{' '}
              {renderFromEnum(SMOKING_STATE, user.form.smoking)}
            </Typography>
            <Typography>
              <Typography color="#888" component="span">
                Алкоголь:
              </Typography>{' '}
              {renderFromEnum(ALCOHOL_STATE, user.form.alcohol)}
            </Typography>
          </div>
        </div>
        <Typography color="#888">Музыка: {user.form.music}</Typography>
        <Typography color="#888">Фильмы: {user.form.movies}</Typography>
        <Typography color="#888">Книги: {user.form.books}</Typography>
        <Typography color="#888">Лейблы: {user.form.labels.join(', ')}</Typography>
        <Typography color="#888">
          Исполнители (доп): {user.form_extension.artists.map((artist) => artist.name).join(', ')}
        </Typography>
        <Typography color="#888">Исполнители (парс вк id): {user.form.artists.join(', ')}</Typography>
      </div>
      <div className={styles.images}>
        {user.stories.map((story) => (
          <div className={styles.story} key={story.media_index}>
            {/* todo: make it optional */}
            {/* <div>
              {story.type === 'video' && <img className={styles.story_media} src={story.blur_url} />}
              {story.type === 'photo' && <img className={styles.story_media} src={story.blur_url} />}
            </div> */}
            <div>
              {story.type === 'video' && (
                <video className={styles.story_media} src={story.video_large_url} controls></video>
              )}
              {story.type === 'photo' && (
                <LazyLoadImage className={styles.story_media} src={story.large_url} width="auto" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
