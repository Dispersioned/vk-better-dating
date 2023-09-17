import { Typography } from '@mui/material';
import { useAuthStore } from 'app/store/auth.store';
import whereRequestIcon from 'assets/whereRequest.png';
import { Data } from 'components/data';

import styles from './styles.module.scss';

export function Home() {
  const { authData } = useAuthStore();

  if (!authData) return null;

  const vktoken = authData.token;

  return (
    <div className={styles.page}>
      {vktoken ? (
        <Data vktoken={vktoken} />
      ) : (
        <div className={styles.helper}>
          <Typography variant="h4" paddingTop={10}>
            To continue provide VK API token
          </Typography>
          <Typography fontSize={20}>
            It can be done by viewing headers of <i>dating.getRecommendedUsers</i> network request on vk dating homepage
          </Typography>
          <img src={whereRequestIcon} alt="" />
        </div>
      )}
    </div>
  );
}
