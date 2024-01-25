import { Checkbox, FormControlLabel, Typography } from '@mui/material';

type SettingCheckboxProps = {
  name: string;
  description: string;
};

export function SettingCheckbox({ name, description }: SettingCheckboxProps) {
  return (
    <div>
      <Typography variant="h5">{name}</Typography>
      <FormControlLabel disabled control={<Checkbox />} label={description} />
    </div>
  );
}
