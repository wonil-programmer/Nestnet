import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={styles.navbar}>
      <h1>
        {/* <Link to="/">Nestnet</Link> */}
        Nestnet
      </h1>
      <nav>
        <ul className={styles.menu}>
          <li>친목</li>
          <li>동아리</li>
          <li>성과</li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
