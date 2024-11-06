import type { ReactNode } from "react"
import { AppLayout } from "./AppLayout"
import { Footer } from "@widgets/Footer"

interface GenericLayoutProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

export function GenericLayout({ children, header, footer }: GenericLayoutProps) {
  return (
    <AppLayout
      header={typeof header === 'undefined' ? <header>thats generic header</header> : header}
      footer={typeof footer === 'undefined' ? <Footer /> : footer}
    >
      {children}
    </AppLayout>
  )
}
