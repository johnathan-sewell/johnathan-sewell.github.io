import styles from "./styles.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.content}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
