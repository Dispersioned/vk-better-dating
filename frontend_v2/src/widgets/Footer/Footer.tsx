import reactLogo from '@assets/react.svg'
import { Button } from 'antd'
import clsx from 'clsx'
import styles from './Footer.module.scss'

export function Footer() {
  const onClickAuthorLink = () => {
    window.open('https://t.me/dispersioned', '_blank')
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.made_with}>
        <span>Made with</span>
        <img src={reactLogo} className={clsx(styles.logo, styles.react)} alt="React logo" />
        <span>
          by
          <Button type="link" onClick={onClickAuthorLink} className={styles.author_link}>dispersioned</Button>
        </span>
      </div>
    </footer>
  )
}