'use client';
import Image from 'next/image';
import styles from './result.module.css';
import downloadIconDark from '../../../public/download-dark.svg'
import downloadIconLight from '../../../public/download-light.svg'
import { useTheme } from '@/context/themeContext';


export default function Result({ url }: { url: string }): JSX.Element {
  const { theme } = useTheme();

  const handleDownload = () => {
    if (!url) return;

    const a = document.createElement('a');
    a.href = url;
    a.download = 'audio.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleDownload} className={styles.button}>
        Download
        <Image src={theme === 'light' ? downloadIconLight : downloadIconDark} alt="download" width={20} height={20} className={styles.icon} />
      </button>
    </div>
  );
}