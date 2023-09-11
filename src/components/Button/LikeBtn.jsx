import { useState } from "react";
import { FaHeart } from "react-icons/fa";

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
    <div className="mt-1.5 mr-3 ml-5 mb-1">
      {isLiked ? (
        <FaHeart
          className="text-[2.3rem] text-red-400 ease-in-out cursor-pointer duration-300 hover:scale-110"
          onClick={toggleLike}
        />
      ) : (
        <FaHeart
          className="text-[2.3rem] text-slate-300 ease-in-out cursor-pointer duration-300 hover:scale-110"
          onClick={toggleLike}
        />
      )}
    </div>
  );
}
