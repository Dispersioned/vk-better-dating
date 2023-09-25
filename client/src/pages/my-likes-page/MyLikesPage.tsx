import { Typography } from '@mui/material';
import { useVkStore } from 'app/store/vk.store';
import { BaseLayout } from 'components/base/base-layout';
import { Likes } from 'components/likes';
import { useEffect } from 'react';

export function MyLikesPage() {
  const { isLoading, fetch, myself, dates } = useVkStore();

  useEffect(() => {
    async function fetchData() {
      await fetch();
    }

    if (!myself || !dates) fetchData();
  }, []);

  if (isLoading)
    return (
      <BaseLayout>
        <Typography variant="h2">Loading</Typography>;
      </BaseLayout>
    );

  return <BaseLayout>{myself && <Likes myself={myself} />}</BaseLayout>;
}
