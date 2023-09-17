import { Typography } from '@mui/material';
import { useAuthStore } from 'app/store/auth.store';
import { useTokenStore } from 'app/store/token.store';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'shared/api';
import { IAxiosError } from 'shared/types';

type ThemeProviderProps = PropsWithChildren;

export function AuthProvider({ children }: ThemeProviderProps) {
  const navigate = useNavigate();
  const { setAuthData, isLoading, setError, setIsLoading } = useAuthStore();
  const { vkparams, setParams } = useTokenStore();

  useEffect(() => {
    setIsLoading(true);

    if (!vkparams) {
      setIsLoading(false);
      setError('Токен отсутствует!');
      navigate('/auth');
      return;
    }

    async function tryLogin() {
      try {
        const authData = await login(vkparams!);
        if (authData) {
          setAuthData(authData);
          setError(null);
        }
      } catch (e) {
        const error = e as IAxiosError;
        setError(error.response.data.error);
        setParams(null);
      }
      setIsLoading(false);
    }
    tryLogin();
  }, []);

  if (isLoading) return <Typography variant="h2">Загрузка...</Typography>;

  return <>{children}</>;
}