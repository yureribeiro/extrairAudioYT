import SwithTheme from "@/components/theme";
import styles from "./page.module.css";
import Form from "@/components/form";
import Title from "@/components/title";

export default function Home() {
  return (
    <main className={styles.main}>
      <Title />
      <SwithTheme />
      <Form />
    </main>
  );
}
