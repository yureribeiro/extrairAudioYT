'use client'
import styles from './button.module.css'
import { useFormStatus } from "react-dom"

export default function Button(): JSX.Element {
  const {pending} = useFormStatus()

  return (
    <button type="submit" disabled={pending} className={styles.button}>{pending ? 'extraindo...' : 'extrair'}</button>
  )
}