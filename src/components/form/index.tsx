'use client';
import { useState } from 'react';
import Button from '../button';
import styles from './form.module.css';
import Result from '../result';
import Dialog from '../dialog';

export default function Form(): JSX.Element {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [pending, setPending] = useState(false);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!url) {
      return;
    }

    try {
      setPending(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: url,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      setResult(downloadUrl);
      console.log('Result:', downloadUrl);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <Dialog />
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="url" className={styles.label}>
          Url do video
          <input
            className={styles.input}
            type="text"
            name="url"
            id="url"
            placeholder="https://www.youtube.com....."
            onChange={(ev) => setUrl(ev.target.value)}
            value={url}
          />
        </label>
        <div className={styles.contentButtons}>
          <Button loading={pending} />
          {result && <Result url={result} />}
        </div>
      </form>
    </>
  );
}