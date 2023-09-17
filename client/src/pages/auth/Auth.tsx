import { Button, Link, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import { useWelcomeStore } from 'app/store/welcome.store';
import authImg from 'assets/img/auth.png';
import { BaseLayout } from 'components/base/base-layout';

import { Form } from './Form';
import styles from './styles.module.scss';

export function Auth() {
  const { isViewed, setViewed } = useWelcomeStore();

  const script = `(() => {
  function get() {
    setTimeout(() => {
      const res = parse();
      if (!res) get();
      else console.log('VK BETTER DATING: PARAMS', res);
    }, 1000);
  }

  function parse() {
    try {
      const str = localStorage.getItem('XHR_STATS_TRANSPORT_DATA_web');
      if (!str) {
        console.log('VK BETTER DATING: NOT FOUND');
        return null;
      }
      const data = JSON.parse(str);
      const webview_url = data.benchmarkMainStats[0].type_mini_apps_performance.webview_url;
      const [_, params] = webview_url.split('?');
      return params;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  get();
})();`;

  return (
    <BaseLayout size="lg">
      <div className={styles.layout}>
        <Typography variant="h2">VK Better Dating </Typography>
        <Typography>Кастомный клиент для ВК знакомств c бэктрекингом, превью мэтчей и фильтрами</Typography>
        {isViewed ? (
          <div className={styles.instructions}>
            <Typography variant="h4">Как авторизоваться?</Typography>
            <div>
              <List disablePadding>
                <ListItem>
                  <ListItemText>
                    1. Зайдите в ВК знакомства. Создайте аккаунт и <i>убедитесь что режим знакомств включен</i> (когда
                    можно видеть и листать анкеты).
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    2. Откройте DevTools. Для этого нажмите F12. Если DevTools не открылись - в свободном месте экрана
                    нажмите
                    <i> ПКМ =&gt; просмотреть код</i>.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    3. В верхней панели DevTools перейдите на вкладку <i>Консоль/Console</i>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    3. Вставьте туда следующий скрипт:{' '}
                    <Typography component="pre" fontFamily="monospace" fontSize={17}>
                      {script}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    4. Спустя 5-20 секунд вы увидите следующий лог:
                    <img src={authImg} alt="auth tip" />
                    Скопируйте всё начиная от vk_access_token... и введите в поле ниже. Если ничего не появилось -
                    попробуйте еще раз, перезагрузив страницу.
                  </ListItemText>
                </ListItem>
              </List>
              <Form />
            </div>
          </div>
        ) : (
          <>
            <Typography className={styles.disclaimer}>
              <b>Дисклеймер</b>: VK Better Dating использует неофициальное апи вконтакте, доступ к которому был получен
              путем реверс-инжиниринга. По этой причине VK Better Dating не поддерживает oauth2 и использует несколько
              усложненный способ получения апи ключей. Ваши данные находятся в безопасности, так как запуск приложения
              происходит в локальном режиме. Если в адресной строке браузера написано не <b>localhost:3000/auth</b> -
              вас пытаются обмануть!
            </Typography>
            <Button className={styles.button} onClick={() => setViewed(true)}>
              Погнали
            </Button>
          </>
        )}
        <Typography>Version 0.1</Typography>
        <Typography>
          Created by{' '}
          <Link href="https://t.me/dispersioned" target="_blank">
            Dispersioned
          </Link>
        </Typography>
      </div>
    </BaseLayout>
  );
}
