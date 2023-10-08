import { useState } from "react";
import { useParams } from "react-router-dom";
import LikeBtn from "../Button/LikeBtn";
import { Oval } from "react-loader-spinner";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCommentInput,
  setComments,
} from "../../routes/Gallery/commentReducer";

const CommentForm = () => {
  const newComment = useSelector((state) => state.comment.newComment);
  const commentsDispatch = useDispatch();
  const newCommentDispatch = useDispatch();

  const { postId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const handleCommentInputChange = () => {
    newCommentDispatch(setCommentInput(inputRef.current.value));
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    // 공백 입력란 제출시 처리
    if (newComment === "") {
      return;
    }

    // 댓글 입력 POST 요청
    setIsLoading(true);
    fetch(`http://localhost:3002/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: 1234,
        content: newComment,
        createdTime: Date.now(),
      }),
    }).then((res) => {
      if (res.ok) {
        // POST 요청이 성공적으로 완료될 때, 데이터를 다시 가져오고 dispatch를 호출하여 업데이트
        fetch(`http://localhost:3002/${postId}`)
          .then((response) => response.json())
          .then((commentsData) => {
            commentsDispatch(setComments(commentsData));
            setIsLoading(false);
            // inputRef.current.focus();
          })
          .catch((error) => {
            console.error("데이터를 다시 가져오는 중 오류 발생:", error);
          });
      }
    });
  };

  return (
    <div className="w-full h-36 pt-2 pb-0 px-8 mt-auto border-t border-border-primary">
      <div className="flex py-[0.6rem] px-0">
        {/* <div className="visit mr-2 ml-auto">
          조회수
          <span className="visitCnt ml-2">{albumData.visits}</span>
        </div>
        <div className="likes mr-2">
          좋아요
          <span className="likesCnt ml-2">{albumData.likes}</span>
        </div> */}
      </div>
      <div className="mt-[0.8rem] flex">
        <div className="profile bg-slate-950 w-12 h-12 ml-4 mr-8 rounded-3xl"></div>
        <form className="flex-auto mr-2" onSubmit={handleAddComment}>
          {isLoading ? (
            <div class="w-full h-full pt-2 pb-1 flex justify-center">
              <Oval
                height={30}
                width={30}
                color="gray"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="gray"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
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
