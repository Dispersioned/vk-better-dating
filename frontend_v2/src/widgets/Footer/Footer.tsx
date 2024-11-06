import reactLogo from '@assets/react.svg'
import styles from './Footer.module.scss'
import clsx from 'clsx'

export function Footer() {
  return (
    <div>
      <div className={styles.made_with}>
        <span>Made with</span>
        <img src={reactLogo} className={clsx(styles.logo, styles.react)} alt="React logo" />
      </div>
    </div>
  )
}