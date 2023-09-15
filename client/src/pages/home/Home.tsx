import { TextField, Typography } from '@mui/material';
import { useTokenStore } from 'app/store/token.store';
import whereRequestIcon from 'assets/whereRequest.png';
import { Data } from 'components/data';

import styles from './styles.module.scss';

export function Home() {
  const { vktoken, setToken } = useTokenStore();
  return (
    <div className={styles.page}>
      <TextField label="VK API TOKEN" value={vktoken} onChange={(e) => setToken(e.target.value)} fullWidth />
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
