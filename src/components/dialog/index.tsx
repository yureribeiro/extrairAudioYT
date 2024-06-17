'use client'
import Image from 'next/image'
import styles from './dialog.module.css'
import questionIconLight from '../../../public/question-light.svg'
import questionIconDark from '../../../public/question-dark.svg'
import { useTheme } from '@/context/themeContext'
import Link from 'next/link'

export default function Dialog() {
  const { theme } = useTheme()

  const handleOpen = () => {
    const dialog = document.querySelector('dialog');
    dialog?.showModal();
  };

  return (
    <div className={styles.container}>
      <Image onClick={handleOpen} src={theme === 'light' ? questionIconLight : questionIconDark} alt="dialog" width={32} height={32} className={styles.image} />
      <dialog className={styles.dialog}>
        <form method="dialog" className={styles.form}>
          <p><span className={styles.span}>1 -</span> Escolha sua música no <Link href="https://www.youtube.com/" target="_blank" className={styles.link}>Youtube</Link></p>
          <p><span className={styles.span}>2 -</span> Copie e cola a URL do video para extrair o áudio</p>
          <p><span className={styles.span}>3 -</span> Aguarde a conversão ser concluída</p>
          <p><span className={styles.span}>4 -</span> Clique no botão abaixo 'download' para baixar o áudio</p>
          <button type="submit" className={styles.button}>Entendi</button>
        </form>
      </dialog>
    </div>

  )
}