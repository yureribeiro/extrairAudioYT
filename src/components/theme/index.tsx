'use client'

import Image from 'next/image'
import styles from './theme.module.css'
import sun from '../../../public/sun.svg'
import moon from '../../../public/lua.svg'
import { useTheme } from '@/context/themeContext'

export default function SwithTheme() {
  const { theme, toogleTheme } = useTheme()

  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <select
          name="theme"
          id="theme"
          className={styles.themeSelect}
          value={theme}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <div
          aria-hidden="true"
          onClick={toogleTheme}
        >
          <Image src={theme === 'light' ? sun : moon} alt="mudar tema" width={20} height={20} className={styles.icon} />
        </div>
      </div>
    </div>
  )
}