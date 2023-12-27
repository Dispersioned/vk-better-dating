import { styled, Container } from '@mui/material'

export const Layout = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 20px;
`

export const Main = styled(Container)`
  margin-top: 20px;
  flex: 1 0 100%;
` as typeof Container
