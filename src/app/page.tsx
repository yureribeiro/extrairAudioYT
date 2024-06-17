import SwithTheme from "@/components/theme";
import styles from "./page.module.css";
import Form from "@/components/form";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Extrair Audio</h1>
      <SwithTheme />
      <Form />
    </main>
  );
}
