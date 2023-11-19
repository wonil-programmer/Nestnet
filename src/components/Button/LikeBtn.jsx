import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { IsAlbumLikeContext } from "../../context/IsAlbumLikeContext";
import axios from "axios";

const LikeBtn = () => {
  const { postId } = useParams();
  const { IsAlbumLike, setIsAlbumLike } = useContext(IsAlbumLikeContext);

  const sendRequest = (url, onSuccess) => {
    axios
      .put(url, null, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          onSuccess();
        }
      })
      .catch((error) => {
        console.error("네트워크 오류:", error);
      });
  };

  const toggleLike = () => {
    if (IsAlbumLike) {
      const dislikeUrl = `${process.env.REACT_APP_SERVER}/${postId}/dislike`;
      sendRequest(dislikeUrl, () => setIsAlbumLike(!IsAlbumLike));
    } else {
      const likeUrl = `${process.env.REACT_APP_SERVER}/${postId}/like`;
      sendRequest(likeUrl, () => {
        setIsAlbumLike(!IsAlbumLike);
      });
    }
  };

  return (
    <div className="mt-1.5 mr-3 ml-5 mb-1">
      {IsAlbumLike ? (
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
