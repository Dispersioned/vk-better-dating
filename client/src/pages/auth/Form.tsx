import { Button, TextField, Typography } from '@mui/material';
import { useTokenStore } from 'app/store/token.store';
import { useVkStore } from 'app/store/vk.store';
import { useState } from 'react';
import { login } from 'shared/api';
import { IAxiosError } from 'shared/types';

import styles from './styles.module.scss';

export function Form() {
  const [params, setParams] = useState('');
  const [error, setError] = useState<string | null>(null);

  const canSubmit = params.length > 0;

  const { setAuthData } = useVkStore();
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
      const error = e as IAxiosError;
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <div className={styles.form}>
        <TextField
          value={params}
          onChange={(e) => setParams(e.target.value)}
          size="small"
          label="Введи параметры сюда"
        />
        <Button disabled={!canSubmit} onClick={onSubmit}>
          Погнали
        </Button>
      </div>
      {error && <Typography>{error}</Typography>}
    </div>
  );
}
