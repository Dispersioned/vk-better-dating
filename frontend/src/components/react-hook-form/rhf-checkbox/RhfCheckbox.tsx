import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Control, useController } from 'react-hook-form';

type RhfCheckboxProps = {
  name: string;
  label: string;
  description: string;
  control?: Control<any, any>;
};

export function RhfCheckbox({ name, label, description, control }: RhfCheckboxProps) {
  const { field } = useController({ control, name });

  return (
    <div>
      <Typography variant="h5">{label}</Typography>
      <FormControlLabel
        name={field.name}
        onChange={(_, value) => field.onChange(value)}
        onBlur={field.onChange}
        disabled={field.disabled}
        control={<Checkbox checked={field.value} ref={field.ref} />}
        label={description}
      />
    </div>
  );
}
