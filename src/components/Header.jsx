import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className={styles.header}>
        <Link to="/">
          <h1 className={styles.logo}>Nestnet</h1>
        </Link>
        <ul className={styles.menu}>
          <li className={styles.menu__item}>홈</li>
          <li className={styles.menu__item}>게시판</li>
          <li className={styles.menu__item}>서비스</li>
        </ul>
        <Link to="/profile">
          <div className={styles.profile}>
            <span>네넷</span>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Header;
