import { useState } from "react";
import styles from "./MainPhotoCover.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsUpDownLeftRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export default function PhotoCover({ albumData }) {
  const [isLiked, setIsLiked] = useState(albumData.isLiked);
  const toggleLike = () => {
    fetch(`http://localhost:3001/galleries/${albumData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...albumData,
        isLiked: !isLiked,
      }),
    }).then((res) => {
      if (res.ok) {
        setIsLiked(!isLiked);
      }
    });
  };
  return (
    <div className={styles.mainPhotoCover}>
      <div className={styles.metadata}>
        <div className={styles.title}>{albumData.title}</div>
        <div className={styles.likes}>
          <FontAwesomeIcon
            className={styles.iconHeart}
            icon={faHeart}
            onClick={toggleLike}
          />
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
