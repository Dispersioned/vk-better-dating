import { Typography } from '@mui/material';
import { useAuthStore } from 'app/store/auth.store';
import { useTokenStore } from 'app/store/token.store';
import { PropsWithChildren, useEffect } from 'react';
import { login } from 'shared/api';
import { IAxiosError } from 'shared/types';

type ThemeProviderProps = PropsWithChildren;

export function AuthProvider({ children }: ThemeProviderProps) {
  const { authData, setAuthData, isLoading, error, setError, setIsLoading } = useAuthStore();
  const { vkparams } = useTokenStore();

  useEffect(() => {
    setIsLoading(true);

    if (!vkparams) {
      setIsLoading(false);
      setError('Токен отсутствует!');
    }

    async function tryLogin() {
      try {
        const authData = await login(vkparams);
        if (authData) {
          setAuthData(authData);
          console.log('успешная авторизация');
        }
      } catch (e) {
        const error = e as IAxiosError;
        setError(error.response.data.error);
      }
      setIsLoading(false);
      setError(null);
    }
    tryLogin();
  }, []);

  if (error) return <Typography variant="h1">Ошибка! {error}</Typography>;

  if (!authData) return <Typography variant="h1">Грузим данные</Typography>;

  return <>{children}</>;
}
