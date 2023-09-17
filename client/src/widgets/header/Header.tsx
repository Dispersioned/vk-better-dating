import { Button, Container, Link, Typography } from '@mui/material';
import { useAuthStore } from 'app/store/auth.store';
import logoIcon from 'assets/icons/logo.svg';
import { APP_VERSION } from 'shared/config/meta';

import styles from './styles.module.scss';

export function Header() {
  const authData = useAuthStore();

  return (
    <header className={styles.header}>
      <Container maxWidth="xl">
        <div className={styles.content}>
          <div className={styles.logo_wrapper}>
            <img className={styles.logo} src={logoIcon} alt="vk better dating" />
            <Typography variant="h5" fontWeight={600}>
              Better Dating
            </Typography>
          </div>
          <div className={styles.header_aside}>
            <Typography>version {APP_VERSION}</Typography>
            <Typography>
              Created by{' '}
              <Link href="https://t.me/dispersioned" target="_blank">
                Dispersioned
              </Link>
            </Typography>
            {authData && <Button color="error">Выйти</Button>}
          </div>
        </div>
      </Container>
    </header>
  );
}
