import styles from "./MainPhotoCover.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function PhotoCover({ albumData }) {
  return (
    <div className={styles.mainPhotoCover}>
      <div className={styles.top}>
        <div>저장하기</div>
      </div>
      <div className={styles.metadata}>
        <div className={styles.title}>{albumData.title}</div>
        <div className={styles.likes}>
          <FontAwesomeIcon className={styles.iconHeart} icon={faHeart} />{" "}
          <span className={styles.likesCnt}>{albumData.likes}</span>
        </div>
      </div>
      <div className={styles.btm}>
        <div>자세히보기</div>
      </div>
    </div>
  );
}
