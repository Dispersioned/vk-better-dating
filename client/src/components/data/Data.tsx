import { useVkStore } from 'app/store/vk.store';
import { Dates } from 'components/Dates';
import { Likes } from 'components/likes';
import { useEffect } from 'react';

import styles from './styles.module.scss';

type DataProps = {
  vktoken: string;
};

export function Data({ vktoken }: DataProps) {
  const { isLoading, fetch, myself, dates } = useVkStore();

  useEffect(() => {
    async function fetchData() {
      await fetch();
    }

    fetchData();
  }, []);

  return (
    <div className={styles.layout}>
      {myself && <Likes myself={myself} />}
      {dates && <Dates dates={dates} />}
    </div>
  );
}
