import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const CommentRegistration = ({ isDescriptionVisible }) => {
  const [newComment, setNewComment] = useState("");

  const inputRef = useRef(null);

  const handleCommentInputChange = () => {
    setNewComment(inputRef.current.value);
  };

  const { mutate: createComment, isPending: isCommentPosting } =
    useCreateComment();

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
        <div className="sticky bottom-0 w-full h-[6rem] rounded-b-3xl bg-white  shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <div class="flex flex-row items-center w-full p-6 px-8">
            <div className="profile bg-slate-950 w-12 h-12 mr-6 rounded-3xl" />
            <form className="flex-auto" onSubmit={handleCommentCreate}>
              {isCommentPosting ? (
                <div class="w-full h-full pt-2 pb-1 flex justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <input
                  onChange={handleCommentInputChange}
                  className="flex w-full h-[3rem] py-0 px-6 bg-[#efefef] border-none rounded-3xl outline-4 outline-red-300"
                  type="text"
                  placeholder="댓글 추가"
                  ref={inputRef}
                />
              )}
            </form>
          </div>
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
