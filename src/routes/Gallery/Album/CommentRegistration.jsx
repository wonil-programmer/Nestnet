import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FiSend } from "react-icons/fi";

/**
 * 앨범 댓글 등록 폼
 * @param {boolean} isDescriptionVisible
 * @returns
 */
const CommentRegistration = ({ isDescriptionVisible }) => {
  // 새로운 댓글 내용
  const [newComment, setNewComment] = useState("");

  const inputRef = useRef(null);

  const handleCommentInputChange = () => {
    setNewComment(inputRef.current.value);
  };

  const { mutate: createComment, isPending: isCommentPending } =
    useCreateComment();

  // 댓글 작성
  const handleCommentCreate = (event) => {
    event.preventDefault();
    if (newComment === "") {
      return;
    }
    createComment(newComment);
  };

  return (
    <>
      {isDescriptionVisible ? (
        <div className="sticky bottom-0 w-full h-[6rem] rounded-b-2xl bg-white  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <form
            className="flex-auto flex flex-row items-center w-full p-6 pl-10 pr-6"
            onSubmit={handleCommentCreate}
          >
            {isCommentPending ? (
              <div className="w-full h-full pt-2 pb-1 flex justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <input
                onChange={handleCommentInputChange}
                className="flex w-full h-[3rem] mr-4 py-0 px-6 bg-[#efefef] border-none rounded-2xl outline-4 outline-home-primary"
                type="text"
                placeholder="댓글 추가"
                ref={inputRef}
              />
            )}
            <button
              className="w-10 h-10 text-home-primary"
              disabled={isCommentPending}
            >
              <FiSend size={32} />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
};

// REST: 댓글 작성
function useCreateComment() {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  return useMutation({
    mutationFn: async (newComment) => {
      const commentPostURL = `${process.env.REACT_APP_SERVER}/comment/${postId}`;

      return await axios.post(commentPostURL, {
        content: newComment,
      });
    },
    // 클라이언트 업데이트
    onSuccess: () => {
      queryClient.invalidateQueries(["album", postId]);
    },
  });
}

export default CommentRegistration;
