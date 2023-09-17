import { Button, Container, Typography } from '@mui/material';
import { useAuthStore } from 'app/store/auth.store';
import logoIcon from 'assets/icons/logo.svg';

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
          {authData && <Button color="error">Выйти</Button>}
        </div>
      </Container>
    </header>
  );
}
