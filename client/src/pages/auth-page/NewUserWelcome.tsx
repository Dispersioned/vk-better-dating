import { Button, Typography } from '@mui/material';
import { useWelcomeStore } from 'app/store/welcome.store';

import styles from './styles.module.scss';

export function NewUserWelcome() {
  const setViewed = useWelcomeStore((state) => state.setViewed);

  return (
    <>
      <Typography className={styles.disclaimer}>
        <b>Дисклеймер</b>: VK Better Dating использует неофициальное апи вконтакте, доступ к которому был получен путем
        реверс-инжиниринга. По этой причине VK Better Dating не поддерживает oauth2 и использует несколько усложненный
        способ получения апи ключей. Ваши данные находятся в безопасности, так как запуск приложения происходит в
        локальном режиме. Если в адресной строке браузера написано не <b>localhost:3000/auth</b> - вас пытаются
        обмануть!
      </Typography>
      <Button className={styles.button} onClick={() => setViewed(true)}>
        Я понимаю, погнали
      </Button>
    </>
  );
}
