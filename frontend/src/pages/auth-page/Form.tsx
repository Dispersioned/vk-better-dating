import { Button, TextField, Typography } from '@mui/material';
import { useAuthStore } from 'app/store/auth.store';
import { useTokenStore } from 'app/store/token.store';
import { useState } from 'react';
import { login } from 'shared/api';
import { toastService } from 'shared/services/toast.service';
import { getAxiosErrorMessage } from 'shared/utils/getAxiosErrorMessage';

import styles from './styles.module.scss';

export function Form() {
  const [params, setParams] = useState('');

  const canSubmit = params.length > 0;

  const { setAuthData } = useAuthStore();
  const { setParams: setVkParams } = useTokenStore();

  const onSubmit = async () => {
    try {
      const authData = await login(params);
      if (authData) {
        setVkParams(params);
        setAuthData(authData);
      }
    } catch (e) {
      const msg = getAxiosErrorMessage(e);
      toastService.error(msg ? `${msg}. Похоже токен неправильный` : 'Токен неправильный или протух. Сгенерийте новый');
    }
  };

  return (
    <div className={styles.form}>
      <TextField
        value={params}
        onChange={(e) => setParams(e.target.value)}
        size="small"
        label="Введи в меня свои параметры, семпай"
      />
      <Button color="success" disabled={!canSubmit} onClick={onSubmit}>
        Поехали
      </Button>
    </div>
  );
}
