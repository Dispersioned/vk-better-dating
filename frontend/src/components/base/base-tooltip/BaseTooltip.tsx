import { Tooltip, Typography } from '@mui/material';

type BaseTooltipProps = Parameters<typeof Tooltip>[0];

export function BaseTooltip({ title, children, ...rest }: BaseTooltipProps) {
  return (
    <Tooltip {...rest} title={<Typography>{title}</Typography>}>
      {children}
    </Tooltip>
  );
}
