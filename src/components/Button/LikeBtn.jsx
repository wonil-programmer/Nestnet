import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsMemberLiked } from "../../routes/Gallery/albumReducer";

// 좋아요 여부를 받아와 처리
const LikeBtn = () => {
  const isMemberLiked = useSelector((state) => state.album.isMemberLiked);
  const likeDispatch = useDispatch();

  const { postId } = useParams();
  // 좋아요 클릭시, 서버에 저장된 사용자의 좋아요 여부에 따른 로직 처리
  const toggleLike = () => {
    // // 좋아요 취소를 누른 경우
    if (isMemberLiked) {
      // fetch(`~/${postId / dislike}`, {
      fetch(`http://localhost:3002/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log("좋아요 취소 요청 성공");
            likeDispatch(setIsMemberLiked(!isMemberLiked));
          }
        })
        .catch((error) => {
          console.error("네트워크 오류:", error);
        });
    }
    // // 좋아요를 누른 경우
    else {
      // fetch(`~/${postId / like}`, {
      fetch(`http://localhost:3002/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            console.log("좋아요 요청 성공");
            likeDispatch(setIsMemberLiked(!isMemberLiked));
          }
        })
        .catch((error) => {
          console.error("네트워크 오류:", error);
        });
    }
  };

  return (
    <div className="mt-1.5 mr-3 ml-5 mb-1">
      {isMemberLiked ? (
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
};

export default LikeBtn;
