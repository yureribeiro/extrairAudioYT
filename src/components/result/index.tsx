// import Link from 'next/link'
'use client'

import styles from './result.module.css'

export default function Result({ url }: { url: string }): JSX.Element {
  const handleDownload = async () => {
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    if (!url) return;

    try {
      const response = await fetch(corsProxy + url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'audio.mp3'; // You can change the file name as needed
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading the file', error);
    }
  };

  return (
    <div className={styles.container}>
      {url && (
         <button onClick={handleDownload} className={styles.button}>
          Download
        </button>
      )}
    </div>
  )
}