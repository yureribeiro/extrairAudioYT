'use client';
import styles from './result.module.css';

export default function Result({ url }: { url: string }): JSX.Element {
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
      </button>
    </div>
  );
}