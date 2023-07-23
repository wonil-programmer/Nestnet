import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header({ scrollToIndex }) {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.logo}>
          <Link to="/">Nestnet</Link>
        </h1>
        <ul className={styles.menu}>
          <li onClick={() => scrollToIndex(0)} className={styles.menu__item}>
            Nest
          </li>
          <li onClick={() => scrollToIndex(1)} className={styles.menu__item}>
            Net
          </li>
          <li onClick={() => scrollToIndex(2)} className={styles.menu__item}>
            Next
          </li>
        </ul>
        <Link to="/profile">
          <div className={styles.profile}>원일</div>
        </Link>
      </div>
    </>
  );
}

export default Header;
