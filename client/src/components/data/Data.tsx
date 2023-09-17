import { useVkStore } from 'app/store/vk.store';
import { Dates } from 'components/Dates';
import { Likes } from 'components/likes';
import { useEffect, useMemo } from 'react';

import styles from './styles.module.scss';

type DataProps = {
  vktoken: string;
};

export function Data({ vktoken }: DataProps) {
  const { isLoading, error, fetch, myself, dates } = useVkStore();

  useEffect(() => {
    async function fetchData() {
      await fetch();
    }

    if (!isLoading) fetchData();
  }, []);

  const matches = useMemo(() => {
    if (!myself || !dates) return [];
    const peopleWhoLikedMePhotoUrls = myself.users.map((user) => user.photo_url);
    // console.log('peopleWhoLikedMePhotoUrls', peopleWhoLikedMePhotoUrls);

    dates.users.forEach((recommendation) => {
      const personBlurredPhotoUrls = recommendation.stories.map((story) => story.blur_url);

      personBlurredPhotoUrls.forEach((url) => {
        if (peopleWhoLikedMePhotoUrls.includes(url)) {
          // console.log('MATCH');
          // console.log('url', url);
        }
      });
    });
  }, [myself, dates]);

  return (
    <div className={styles.layout}>
      {myself && <Likes myself={myself} />}
      {dates && <Dates dates={dates} />}
    </div>
  );
}
