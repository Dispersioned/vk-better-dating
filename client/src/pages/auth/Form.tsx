import { Button, TextField } from '@mui/material';
import { useTokenStore } from 'app/store/token.store';
import { useState } from 'react';

import styles from './styles.module.scss';

export function Form() {
  const [params, setParams] = useState('');

  const canSubmit = params.length > 0;

  const { vkparams, setParams: setVkParams } = useTokenStore();

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <div className={styles.form}>
      <TextField value={params} onChange={(e) => setParams(e.target.value)} size="small" label="Введи параметры сюда" />
      <Button disabled={!canSubmit} onClick={onSubmit}>
        Погнали
      </Button>
    </div>
  );
}
