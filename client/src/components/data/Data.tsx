import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from 'app/store/auth.store';
import { Dates } from 'components/Dates';
import { getDates } from 'shared/api';

import styles from './styles.module.scss';

// todo: rename to recommendations or feed
export function Data() {
  // const { isLoading, fetch, myself, dates } = useVkStore();

  // useEffect(() => {
  //   async function fetchData() {
  //     await fetch();
  //   }

  //   if (!myself || !dates) fetchData();
  // }, []);

  const { authData } = useAuthStore();

  if (!authData) return null;

  const vktoken = authData.token;
  const userId = authData.user.vk_id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['recommendations'],
    queryFn: () => {
      return getDates({ vktoken, userId });
    },
  });

  if (isLoading) {
    return <Typography variant="h2">Загрузка...</Typography>;
  }

  if (!data) {
    return <Typography variant="h2">Упс, ошибка</Typography>;
  }

  return <div className={styles.layout}>{data && <Dates dates={data} />}</div>;
}
