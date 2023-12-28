import { Button, Checkbox, FormControlLabel, Link as MUILink, Typography } from '@mui/material';
import { useWelcomeStore } from 'app/store/welcome.store';
import { useState } from 'react';
import { UsageAgrementPopup } from 'widgets/usage-agrement-popup';

import styles from './styles.module.scss';

export function NewUserWelcome() {
  const [isAgreeWithRules, setIsAgreeWithRules] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const setViewed = useWelcomeStore((state) => state.setIsPolicyAgreed);

  return (
    <>
      <Typography className={styles.disclaimer}>
        <b>Дисклеймер</b>: VK Better Dating использует неофициальное апи вконтакте, доступ к которому был получен путем
        реверс-инжиниринга. По этой причине VK Better Dating не поддерживает oauth2 и использует несколько усложненный
        способ получения апи ключей.
      </Typography>
      <div>
        <FormControlLabel
          control={<Checkbox checked={isAgreeWithRules} />}
          onClick={() => setIsAgreeWithRules((isAgree) => !isAgree)}
          label={
            <>
              <Typography>
                Я согласен (согласна) с <MUILink onClick={() => setIsPopupOpen(true)}>правилами использования</MUILink>
              </Typography>
              <UsageAgrementPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
            </>
          }
        />
      </div>
      <Button className={styles.button} onClick={() => setViewed(true)} disabled={!isAgreeWithRules} color="success">
        Я понимаю, погнали
      </Button>
    </>
  );
}
