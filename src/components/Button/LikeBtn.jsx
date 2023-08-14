import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartsolid } from "@fortawesome/free-solid-svg-icons";
import styles from "./LikeBtn.module.css";

export default function LikeBtn({ albumData }) {
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
    <div className={styles.likeBtn}>
      {isLiked ? (
        <FontAwesomeIcon
          className={styles.iconHeartFilled}
          icon={faHeartsolid}
          onClick={toggleLike}
        />
      ) : (
        <FontAwesomeIcon
          className={styles.iconHeart}
          icon={faHeart}
          onClick={toggleLike}
        />
      )}
    </div>
  );
}
