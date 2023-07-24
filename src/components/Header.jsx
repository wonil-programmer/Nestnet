import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.logo}>
          <Link to="/">Nestnet</Link>
        </h1>
        <ul className={styles.menu}>
          <li className={styles.menu__item}>Nest</li>
          <li className={styles.menu__item}>Net</li>
          <li className={styles.menu__item}>Next</li>
        </ul>
        <Link to="/profile">
          <div className={styles.profile}></div>
        </Link>
      </div>
    </>
  );
}

export default Header;
