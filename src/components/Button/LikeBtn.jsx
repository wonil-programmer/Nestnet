import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartsolid } from "@fortawesome/free-solid-svg-icons";
import styles from "./LikeBtn.module.css";

// 좋아요 여부를 받아와 처리
export default function LikeBtn({ albumData }) {
  const [isLiked, setIsLiked] = useState(albumData.isLiked);
  // 좋아요 클릭시, 서버에 저장된 사용자의 좋아요 여부에 따른 로직 처리
  const toggleLike = () => {
    // // 좋아요 취소를 누른 경우
    // if (albumData.is - member - liked) {
    //   fetch(`~/${postId / dislike}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => {
    //       if (res.ok) {
    //         console.log("좋아요 취소 요청 성공");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("네트워크 오류:", error);
    //     });
    // }
    // // 좋아요를 누른 경우
    // else {
    //   fetch(`~/${postId / like}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => {
    //       if (res.ok) {
    //         console.log("좋아요 요청 성공");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("네트워크 오류:", error);
    //     });
    // }

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
