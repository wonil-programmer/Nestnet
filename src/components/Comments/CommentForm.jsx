import { useState, useRef, useContext } from "react";
import { CommentContext } from "../../context/CommentContext";
import { useParams } from "react-router-dom";
import LikeBtn from "../Button/LikeBtn";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

/**
 * 댓글 입력 폼
 */
const CommentForm = ({ viewCount, likeCount }) => {
  const { postId } = useParams();

  const setComments = useContext(CommentContext);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");

  const inputRef = useRef(null);

  const handleCommentInputChange = () => {
    setNewComment(inputRef.current.value);
  };

  // 댓글 입력시 처리
  const handleAddComment = (event) => {
    event.preventDefault();
    if (newComment === "") {
      return;
    }

    // 댓글 입력시 POST 요청
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER}/`,
        {
          username: 1234,
          content: newComment,
          createdTime: Date.now(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // POST 요청이 성공적으로 완료될 때, 데이터를 다시 가져와 주입
          axios
            .get(`${process.env.REACT_APP_SERVER}/`)
            .then((response) => {
              const commentsData = response.data;
              setComments(commentsData);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error("데이터를 다시 가져오는 중 오류 발생:", error);
            });
        }
      })
      .catch((error) => {
        console.error("POST 요청 중 오류 발생:", error);
      });
  };

  return (
    <div className="w-full h-36 pt-2 pb-0 px-8 mt-auto border-t border-border-primary">
      <div className="flex py-[0.6rem] px-0">
        <div className="visit mr-2 ml-auto">
          조회수
          <span className="visitCnt ml-2">{viewCount}</span>
        </div>
        <div className="likes mr-2">
          좋아요
          <span className="likesCnt ml-2">{likeCount}</span>
        </div>
      </div>
      <div className="mt-[0.8rem] flex">
        <div className="profile bg-slate-950 w-12 h-12 ml-4 mr-8 rounded-3xl"></div>
        <form className="flex-auto mr-2" onSubmit={handleAddComment}>
          {isLoading ? (
            <div class="w-full h-full pt-2 pb-1 flex justify-center">
              <LoadingSpinner></LoadingSpinner>
            </div>
          ) : (
            <input
              onChange={handleCommentInputChange}
              className="flex w-full h-full py-0 px-6 bg-[#efefef] border-none rounded-3xl outline-4 outline-red-300"
              type="text"
              placeholder="댓글 추가"
              ref={inputRef}
            />
          )}
        </form>
        <LikeBtn />
      </div>
    </div>
  );
};

export default CommentForm;
