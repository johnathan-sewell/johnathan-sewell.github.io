import styles from "./styles.module.css";

function Header(props) {
  return (
    <header className={styles.header}>
      <a href="/">
        {props.isHome && (
          <h1 className={styles.homeHeading}>
            <span className={styles.gradient}>Johnathan Sewell.</span> Code.
            Architecture. Experiments.
          </h1>
        )}
        {!props.isHome && (
          <div className={styles.heading}>
            <span className={styles.gradient}>Johnathan Sewell.</span>
          </div>
        )}
      </a>
    </header>
  );
}

export default Header;
