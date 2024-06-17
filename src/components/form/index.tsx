'use client'
import { useState } from 'react';
import Button from '../button'
import styles from './form.module.css'
import Result from '../result';

export default function Form(): JSX.Element {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');


  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!url) {
      return;
    }

    const response = await fetch("http://localhost:3000/api/download", {
      method: "POST",
      body: url
    });

    const data = await response.json();
    setResult(data.firstUrl);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="url" className={styles.label}>Url do video
          <input
            className={styles.input}
            type="text"
            name="url"
            placeholder="url"
            value={url}
            onChange={(ev) => setUrl(ev.target.value)}
          />
        </label>
        <Button />
      </form>
      <Result url={result} />
    </>
  )
}