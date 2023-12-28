import { Typography } from '@mui/material';
import { useWelcomeStore } from 'app/store/welcome.store';
import { BaseLayout } from 'components/base/base-layout';

import { Form } from './Form';
import { Instructions } from './Instructions';
import { NewUserWelcome } from './NewUserWelcome';
import styles from './styles.module.scss';

export function AuthPage() {
  const isPolicyAgreed = useWelcomeStore((state) => state.isPolicyAgreed);

  return (
    <BaseLayout size="lg">
      <div className={styles.layout}>
        <Typography variant="h2">VK Better Dating </Typography>
        <Typography>Кастомный клиент для ВК знакомств c бэктрекингом, превью мэтчей и фильтрами</Typography>
        {isPolicyAgreed ? (
          <div className={styles.instructions}>
            <Typography variant="h4">Как авторизоваться?</Typography>
            <div>
              <Instructions />
              <Form />
            </div>
          </div>
        ) : (
          <NewUserWelcome />
        )}
      </div>
    </BaseLayout>
  );
}
