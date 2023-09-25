import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from 'app/store/auth.store';
import { BaseLayout } from 'components/base/base-layout';
import { Likes } from 'components/likes';
import { getDates, getLikes } from 'shared/api';

export function MyLikesPage() {
  // TODO: дублирующаяся логика между страницами, вынести в хук загрузки данных
  const { authData } = useAuthStore();

  if (!authData) return null;

  const vktoken = authData.token;
  const userId = authData.user.vk_id;

  const { data: dates, isLoading: isLoadingDates } = useQuery({
    queryKey: ['dates'],
    queryFn: () => {
      return getDates({ vktoken, userId });
    },
  });

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      return getLikes({ vktoken, userId });
    },
  });

  if (isLoadingDates || isLoadingProfile) {
    return <Typography variant="h2">Загрузка...</Typography>;
  }

  if (!dates || !profile) {
    return <Typography variant="h2">Упс, ошибка</Typography>;
  }

  return (
    <BaseLayout>
      <Likes />
    </BaseLayout>
  );
}
