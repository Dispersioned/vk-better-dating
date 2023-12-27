import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import styles from './styles.module.scss';

type UsageAgrementPopupProps = {
  open: boolean;
  onClose: () => void;
};

export function UsageAgrementPopup({ open, onClose }: UsageAgrementPopupProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Правила использования</DialogTitle>
      <DialogContent className={styles.content}>
        <DialogContentText>
          АПИ ключ, используемый VK Better Dating, хранится локально в браузере и не сохраняется на сервере.
        </DialogContentText>
        <DialogContentText>
          Профиль авторизованного пользователя (вас) не сохраняется нигде и запрашивается сессионно.
        </DialogContentText>
        <DialogContentText>
          Анкеты других пользователей в ленте сохраняются на сервере и могут быть использованы для показа превью мэтчей
          у всех пользователей VK Better Dating.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}
