import { type ReactNode } from "react"
import { TanstackQueryProvider } from "./TanstackQueryProvider"

interface AppGlobalProvidersProps {
  children: ReactNode
}

export function AppGlobalProviders({ children }: AppGlobalProvidersProps) {
  return (
    <TanstackQueryProvider>
      {children}
    </TanstackQueryProvider>
  )
}

