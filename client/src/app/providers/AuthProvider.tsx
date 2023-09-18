import { Typography } from '@mui/material';
import { useAuthStore } from 'app/store/auth.store';
import { useTokenStore } from 'app/store/token.store';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'shared/api';
import { toastService } from 'shared/services/toast.service';
import { IAxiosError } from 'shared/types';
import { getAxiosErrorMessage } from 'shared/utils/getAxiosErrorMessage';

type ThemeProviderProps = PropsWithChildren;

export function AuthProvider({ children }: ThemeProviderProps) {
  const navigate = useNavigate();
  const { setAuthData, isLoading, setIsLoading } = useAuthStore();
  const { vkparams, setParams } = useTokenStore();

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
        toastService.error(getAxiosErrorMessage(e) || 'Токен неправильный или протух. Сгенерийте новый');
        setParams(null);
      }
      setIsLoading(false);
    }
    tryLogin();
  }, []);

  if (isLoading) return <Typography variant="h2">Загрузка...</Typography>;

  return <>{children}</>;
}
