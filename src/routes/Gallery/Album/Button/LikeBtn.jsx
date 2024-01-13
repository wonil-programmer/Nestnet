import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { IsAlbumLikeContext } from "../../../../context/IsAlbumLikeContext";
import axios from "axios";
import { CircleButton as Button } from "../../../../components/CircleButton";

const LikeBtn = ({ isMemberLiked }) => {
  const { postId } = useParams();

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

  // const toggleLike = () => {
  //   if (isMemberLiked) {
  //     const dislikeUrl = `${process.env.REACT_APP_SERVER}/${postId}/dislike`;
  //     sendRequest(dislikeUrl, () => setIsMemberLike(!isMemberLiked));
  //   } else {
  //     const likeUrl = `${process.env.REACT_APP_SERVER}/${postId}/like`;
  //     sendRequest(likeUrl, () => {
  //       setIsMemberLike(!isMemberLiked);
  //     });
  //   }
  // };

  return (
    <Button
      content={
        isMemberLiked ? (
          <FaHeart
            className="m-auto text-2xl text-red-400"
            // onClick={toggleLike}
          />
        ) : (
          <FaHeart
            className="m-auto text-2xl text-slate-300"
            // onClick={toggleLike}
          />
        )
      }
    />
  );
};

export default LikeBtn;
