import { Breakpoint, Typography } from '@mui/material';
import { CSSProperties, PropsWithChildren } from 'react';

import { Layout, Main } from '../styles/BaseLayout';

type BaseLayoutProps = PropsWithChildren<{
  size?: Breakpoint | false;
  containerStyle?: CSSProperties;
}>;

export function BaseLayout({ children, size = 'xl', containerStyle }: BaseLayoutProps) {
  return (
    <Layout>
      <header>
        <Typography>header</Typography>
      </header>
      <Main component="main" maxWidth={size} style={containerStyle}>
        {children}
      </Main>
    </Layout>
  );
}
