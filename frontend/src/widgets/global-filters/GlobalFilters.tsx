import { Button, Typography } from '@mui/material';
import { RhfCheckbox } from 'components/react-hook-form/rhf-checkbox';
import { FormProvider, useForm } from 'react-hook-form';

import { AutoSaveData } from './AutoSaveData';
import styles from './GlobalFilters.module.scss';
import { IGlobalConfig } from './types';
import { createDefaultGlobalFilters, loadGlobalFilters } from './utils/globalConfigs.utils';

export function GlobalFilters() {
  const fields = useForm<IGlobalConfig>({
    defaultValues: loadGlobalFilters() || createDefaultGlobalFilters(),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { control, getValues } = fields;

  return (
    <FormProvider {...fields}>
      <AutoSaveData control={control} />
      <Button onClick={() => console.log('getValues', getValues())}>debug getValues</Button>
      <div className={styles.list}>
        <Typography>Фильтрация:</Typography>
        <RhfCheckbox
          name="autoFilter"
          label="Автофильтр (DANGER)"
          description="Автоматически пропускать всех пользователей, не подходящих под текущие фильтры. ВНИМАНИЕ: эта настройка зачастую пропускает МНОГО анкет. Не советую включать её, если ты живёте вне Москвы или СПБ"
        />
        <Typography>Подсветка:</Typography>
      </div>
    </FormProvider>
  );
}
