import { Typography } from '@mui/material';
import { BaseTooltip } from 'components/base/base-tooltip';

type LocationProps = {
  distanceMeters: number;
  canBeHidden: boolean;
};

export function Location({ distanceMeters, canBeHidden }: LocationProps) {
  if (distanceMeters === 0) {
    if (canBeHidden) {
      return <Typography>Дистанция скрыта или не определена</Typography>;
    }
    return <Typography>Дистанция не определена</Typography>;
  }

  if (distanceMeters < 2000) {
    return <Typography>{distanceMeters} метров от вас</Typography>;
  }

  const precision = 2;
  const corrector = Math.pow(10, precision);
  const distanceKilometers = Math.round((distanceMeters / 1000) * corrector) / corrector;

  return (
    <BaseTooltip title={`${distanceMeters} метров от вас`}>
      <Typography>Примерно {distanceKilometers} км от вас</Typography>
    </BaseTooltip>
  );
}
