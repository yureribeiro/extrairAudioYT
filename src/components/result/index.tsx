import Link from 'next/link'
import styles from './result.module.css'

export default function Result({ url }: { url: string }): JSX.Element {
  return (
    <div className={styles.container}>
      {url && (
        <Link
          href={url}
          target='_blank'
          className={styles.button}
          rel="noopener noreferrer"
          prefetch={false}
        >Ouvir
        </Link>
      )}
    </div>
  )
}