import { type ReactNode } from 'react'
import styles from './AppLayout.module.scss'

interface AppLayoutProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

export function AppLayout({ children, footer, header }: AppLayoutProps) {
  return (
    <div className={styles.root_layout}>
      {header}
      {<main className={styles.page_content}>{children}</main>}
      {footer}
    </div>
  )
}