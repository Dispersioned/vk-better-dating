import { useEffect } from 'react';
import { Control, FieldValues, useWatch } from 'react-hook-form';
import { KEY_GLOBAL_CONFIG } from 'shared/config/consts';

type AutoSaveDataProps<FormData extends FieldValues> = {
  control: Control<FormData, any>;
};

export function AutoSaveData<FormData extends FieldValues>({ control }: AutoSaveDataProps<FormData>) {
  const formData = useWatch({ control });

  useEffect(() => {
    localStorage.setItem(KEY_GLOBAL_CONFIG, JSON.stringify(formData));
  }, [formData]);

  return null;
}
