import { Breakpoint } from '@mui/material';
import { CSSProperties, PropsWithChildren } from 'react';
import { Header } from 'widgets/header';

import { Layout, Main } from '../styles/BaseLayout';

type BaseLayoutProps = PropsWithChildren<{
  size?: Breakpoint | false;
  containerStyle?: CSSProperties;
}>;

export function BaseLayout({ children, size = 'xl', containerStyle }: BaseLayoutProps) {
  return (
    <Layout>
      <Header />
      <Main component="main" maxWidth={size} style={containerStyle}>
        {children}
      </Main>
    </Layout>
  );
}
