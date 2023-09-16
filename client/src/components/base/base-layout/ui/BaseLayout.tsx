import { CSSProperties, PropsWithChildren } from 'react'
import { Layout, Main } from '../styles/BaseLayout'

type BaseLayoutProps = PropsWithChildren<{
  size?: 'xl' | false
  containerStyle?: CSSProperties
}>

export function BaseLayout({ children, size = 'xl', containerStyle }: BaseLayoutProps) {
  return (
    <Layout>
      <header>header</header>
      <Main component="main" maxWidth={size} style={containerStyle}>
        {children}
      </Main>
    </Layout>
  )
}
