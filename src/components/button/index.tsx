'use client'
import styles from './button.module.css'
import { useFormStatus } from "react-dom"

export default function Button({ loading }: { loading?: boolean }): JSX.Element {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending || loading} className={styles.button}>{pending || loading ? 'extraindo...' : 'extrair'}</button>
  )
}