'use client'
import Image from 'next/image'
import { useTheme } from '@/context/themeContext'
import youtubeIconDark from '../../../public/youtube-dark.svg'
import youtubeIconLight from '../../../public/youtube-light.svg'
import styles from './title.module.css'


export default function Title(): JSX.Element {
  const { theme } = useTheme()
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>Converter e Baixar Audio</h1>
      <Image src={theme === 'light' ? youtubeIconLight : youtubeIconDark} alt="youtube icone" width={50} height={50} className={styles.icon} />
    </div>
  )
}