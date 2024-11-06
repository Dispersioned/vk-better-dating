import '@app/css/global.css'
import { AppGlobalProviders } from './providers/AppGlobalProviders'
import { AppRouter } from './router/AppRouter'

export function App() {
  return (
    <AppGlobalProviders>
      <AppRouter />
    </AppGlobalProviders>
  )
}

