import { Typography } from '@mui/material';
import { useAuthStore } from 'app/store/auth.store';
import { useTokenStore } from 'app/store/token.store';
import { BaseLayout } from 'components/base/base-layout';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'shared/api';
import { toastService } from 'shared/services/toast.service';
import { IAxiosError } from 'shared/types';
import { getAxiosErrorMessage } from 'shared/utils/getAxiosErrorMessage';

type ThemeProviderProps = PropsWithChildren;

export function AuthProvider({ children }: ThemeProviderProps) {
  const navigate = useNavigate();
  const { setAuthData, isLoading, setIsLoading, isInited, setIsInited } = useAuthStore();
  const { vkparams, setParams } = useTokenStore();

  // todo: сюда добавить локальный стейт isLoaded

  useEffect(() => {
    setIsLoading(true);

    if (!vkparams) {
      setIsLoading(false);
      navigate('/auth');
      return;
    }

    async function tryLogin() {
      try {
        const authData = await login(vkparams!);
        if (authData) {
          setAuthData(authData);
        }
      } catch (e) {
        const msg = getAxiosErrorMessage(e);

        if (msg === 'launch_url_invalid') {
          toastService.error('Токен неправильный или протух. Сгенерийте новый');
          setParams(null);
        } else if (msg === 'Network Error') {
          toastService.error('Отсутствует связь с локальным сервером');
        }
      }
      setIsLoading(false);
      setIsInited(true);
    }
    if (!isLoading) tryLogin();
  }, []);

  if (isLoading)
    return (
      <BaseLayout>
        <Typography variant="h2">Загрузка...</Typography>;
      </BaseLayout>
    );

  return <>{children}</>;
}
