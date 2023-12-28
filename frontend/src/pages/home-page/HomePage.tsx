import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from 'app/store/auth.store';
import { Dates } from 'components/Dates';
import { BaseLayout } from 'components/base/base-layout';
import { getRecommendations } from 'shared/api';

export function HomePage() {
  const { authData } = useAuthStore();

  if (!authData) return null;

  const token = authData.token;
  const VKID = authData.user.vk_id;

  const { data, isLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: () => {
      return getRecommendations({ token, VKID });
    },
  });

  if (isLoading) {
    return (
      <BaseLayout>
        <Typography variant="h2">Загрузка...</Typography>;
      </BaseLayout>
    );
  }

  if (!data) {
    return (
      <BaseLayout>
        <Typography variant="h2">
          Произошла ошибка. Скорее всего что-то не так с автором. Попробуйте позже или свяжитесь с разработчиком
        </Typography>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Dates feed={data.feed} likes={data.likes} />
    </BaseLayout>
  );
}
