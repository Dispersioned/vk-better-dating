import { Dates } from 'components/Dates';
import { Likes } from 'components/likes';
import { useEffect, useMemo, useState } from 'react';
import { getDates, getLikes } from 'shared/api';
import { IDates, IMyself } from 'shared/types';

import styles from './styles.module.scss';

type DataProps = {
  vktoken: string;
};

export function Data({ vktoken }: DataProps) {
  const [myself, setMyself] = useState<IMyself | null>(null);
  const [dates, setDates] = useState<IDates | null>(null);

  useEffect(() => {
    async function updateData() {
      if (!myself) {
        const myselfApi = await getLikes(vktoken);
        if (myselfApi) setMyself(myselfApi);
      }
      if (!dates) {
        const datesApi = await getDates(vktoken);
        if (datesApi) setDates(datesApi);
      }
    }

    updateData();
  }, []);

  const matches = useMemo(() => {
    if (!myself || !dates) return [];
    const peopleWhoLikedMePhotoUrls = myself.users.map((user) => user.photo_url);
    console.log('peopleWhoLikedMePhotoUrls', peopleWhoLikedMePhotoUrls);

    dates.users.forEach((recommendation) => {
      const personBlurredPhotoUrls = recommendation.stories.map((story) => story.blur_url);

      personBlurredPhotoUrls.forEach((url) => {
        if (peopleWhoLikedMePhotoUrls.includes(url)) {
          console.log('MATCH');
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
