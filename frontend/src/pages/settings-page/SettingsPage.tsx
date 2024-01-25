import { Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { BaseLayout } from 'components/base/base-layout';
import { GlobalFilters } from 'widgets/global-filters';

import { SettingCheckbox } from './SettingCheckbox';
import styles from './styles.module.scss';

export function SettingsPage() {
  return (
    <BaseLayout>
      <div className={styles.content}>
        <Typography variant="h4" align="center">
          Настройки
        </Typography>
        <Typography>
          Важно понимать что лента отображает анкеты по 50 человек. Если 40 из них отпадают по фильтрам - тебе будет
          доступно только 10 человек. И перезапрашивать ты их будешь в 50/10=5 раз чаще.
        </Typography>
        <GlobalFilters />
        <div className={styles.settings}>
          <SettingCheckbox name="Выключить астрологию" description="Скрывает знаки зодиака в описании анкеты" />
          <SettingCheckbox
            name="Непустые анкеты"
            description="Скрывает незаполненные анкеты. Раздел интересы не учитывается"
          />
          <SettingCheckbox name="Непустые анкеты+" description="Скрывает анкеты, если раздел о себе меньше 60 строк" />
          <SettingCheckbox
            name="Капля логики"
            description="Скрывает анкеты, цели которой не совпадают с вашими. (например при серьёзных знакомствах не будет показываться дружеское общение)"
          />
          <SettingCheckbox name="Православный мир" description="Скрывает анкеты людей, ищущих свободные отношения" />
          <SettingCheckbox name="Скамейка запасных" description="Скрывает анкеты людей, находящихся в отношениях" />
          <SettingCheckbox
            name="Убрать тарелочниц"
            description='Скрывает анкеты с наглым разводом на поесть e.g. "своди в ресторан"'
          />
          <SettingCheckbox
            name="Убрать инстаграмщиц"
            description="Скрывает пустые анкеты, если в описании есть только инстаграм"
          />
          <SettingCheckbox
            name="Убрать фанбазу BTS"
            description="Скрывает анкеты, если в описание или музыке упоминается K-Pop и BTS"
          />
          <div>
            <div>
              <Typography variant="h5">Я не встречаюсь с парнями ниже...</Typography>
              <FormControlLabel
                disabled
                control={<Checkbox />}
                label="Включает фильтр по росту. Если не заполнить данные, они будут равны 0 и 200см. Максимальный рост не может быть меньше минимального"
              />
            </div>
            <div className={styles.height_filter}>
              <TextField variant="filled" disabled label="Минимальный, см" />
              <TextField variant="filled" disabled label="Максимальный, см" />
            </div>
          </div>
          GLobal
        </div>
      </div>
    </BaseLayout>
  );
}
