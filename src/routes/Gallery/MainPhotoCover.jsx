import styles from "./MainPhotoCover.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsUpDownLeftRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export default function PhotoCover({ albumData }) {
  return (
    <div className={styles.mainPhotoCover}>
      <div className={styles.metadata}>
        <div className={styles.title}>{albumData.title}</div>
        <div className={styles.likes}>
          <FontAwesomeIcon className={styles.iconHeart} icon={faHeart} />{" "}
          <span className={styles.likesCnt}>{albumData.likes}</span>
        </div>
      </div>
      <div className={styles.btm}>
        <div>
          <FontAwesomeIcon
            className={styles.enlarge}
            icon={faArrowsUpDownLeftRight}
          />
        </div>
      </div>
    </div>
  );
}
