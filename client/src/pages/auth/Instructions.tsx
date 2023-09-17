import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import authImg from 'assets/img/auth.png';
import { toast } from 'react-toastify';
import { copyToClipboard } from 'shared/utils/copyToClipboard';

import styles from './styles.module.scss';

export function Instructions() {
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

  const onCopyScript = () => {
    copyToClipboard(script);
    toast('Скопировано!', { type: 'success', position: 'bottom-center' });
  };

  return (
    <List disablePadding>
      <ListItem>
        <ListItemText>
          1. Зайдите в ВК знакомства. <i>Создайте аккаунт</i>, если у вас его нет и{' '}
          <i>убедитесь что режим знакомств включен</i> (анкеты видно и их можно листать).
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          2. Откройте DevTools. Для этого нажмите F12. Если DevTools не открылись - в свободном месте экрана нажмите
          <i> ПКМ =&gt; просмотреть код</i>.
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          3. В верхней панели DevTools перейдите на вкладку <i>Консоль (Console)</i>
        </ListItemText>
      </ListItem>
      <ListItem className={styles.instruction_script}>
        <div className={styles.instruction_script_text}>
          <ListItemText>3. Вставьте туда следующий скрипт:</ListItemText>
          <Button onClick={onCopyScript}>нажми, чтобы скопировать</Button>
        </div>
        <Typography component="pre" fontFamily="monospace" fontSize={17}>
          {script}
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemText>
          4. Спустя 5-20 секунд вы увидите следующий лог:
          <img className={styles.instruction_image} src={authImg} alt="auth tip" />
          Если ничего не появилось - попробуйте еще раз, предварительно перезагрузив страницу.
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          5. Скопируйте всё, начиная от <b>vk_access_token</b> и введите в поле ниже.
        </ListItemText>
      </ListItem>
    </List>
  );
}
