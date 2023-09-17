import { Button, TextField, Typography } from '@mui/material';
import { useAuthStore } from 'app/store/auth.store';
import { useTokenStore } from 'app/store/token.store';
import { useState } from 'react';
import { login } from 'shared/api';
import { getAxiosErrorMessage } from 'shared/utils/getAxiosErrorMessage';

import styles from './styles.module.scss';

export function Form() {
  const [params, setParams] = useState('');
  const [error, setError] = useState<string | null>(null);

  const canSubmit = params.length > 0;

  const { setAuthData } = useAuthStore();
  const { setParams: setVkParams } = useTokenStore();

  const onSubmit = async () => {
    setError(null);
    try {
      const authData = await login(params);
      if (authData) {
        setVkParams(params);
        setAuthData(authData);
      }
    } catch (e) {
      console.log('e', e);
      setError(getAxiosErrorMessage(e) || 'Токен неправильный или протух. Сгенерийте новый');
    }
  };

  return (
    <div>
      <div className={styles.form}>
        <TextField
          value={params}
          onChange={(e) => setParams(e.target.value)}
          size="small"
          label="Введи в меня свои параметры, семпай"
        />
        <Button disabled={!canSubmit} onClick={onSubmit}>
          Поехали
        </Button>
      </div>
      {error && <Typography>{error}</Typography>}
    </div>
  );
}
