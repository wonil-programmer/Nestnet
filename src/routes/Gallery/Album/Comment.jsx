import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const Comment = ({ comment, setSelectedCommentId, isUpdating }) => {
  const {
    id: commentId,
    username,
    content,
    createdTime,
    modifiedTime,
    memberWritten: isMemberWritten,
  } = comment;

  const [updateValue, setUpdateValue] = useState(content);
  const updateInputRef = useRef(null);

  const { mutate: updateComment, isPending: isUpdatingComment } =
    useUpdateComment();
  const { mutate: deleteComment, isPending: isDeletingComment } =
    useDeleteComment();

  const handleCommentUpdate = (comment) => {
    setUpdateValue(content);
    setSelectedCommentId(commentId);
  };
  const handleUpdateComplete = (updatedValue) => {
    updateComment({
      ...comment,
      content: updatedValue,
    });
    setSelectedCommentId(0);
  };

  const handleCommentDelete = (commentId) => {
    deleteComment(commentId);
  };

  const updateInput = (
    <textarea
      onChange={() => setUpdateValue(updateInputRef.current.value)}
      className="flex w-full break-all px-3 border-b border-red-300 focus:outline-none focus:border-red-500"
      type="text"
      value={updateValue}
      ref={updateInputRef}
      minLength={2}
      maxLength={100}
      rows={2}
    />
  );

  return (
    <>
      <li className="w-full" key={commentId}>
        <div className="w-full flex pb-4">
          <div className="profile flex flex-col justify-start mr-6 pt-1">
            <div className="w-[2.3rem] h-[2.3rem] rounded-3xl bg-slate-900">
              <div>{username}</div>
              <img className="" src="" alt="" />
            </div>
          </div>
          <div className="w-full break-all">
            {isUpdating ? (
              updateInput
            ) : (
              <div className="w-full whitespace-normal">{content}</div>
            )}
            <div className="flex flex-row justify-end mt-2 pr-4 text-[0.8rem]">
              {isMemberWritten ? (
                isUpdating ? (
                  <>
                    <button
                      className="mr-2"
                      onClick={() => setSelectedCommentId(0)}
                    >
                      취소
                    </button>
                    <button onClick={() => handleUpdateComplete(updateValue)}>
                      완료
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="mr-2"
                      onClick={() => handleCommentUpdate(comment)}
                    >
                      수정
                    </button>
                    <button onClick={() => handleCommentDelete(commentId)}>
                      삭제
                    </button>
                  </>
                )
              ) : null}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

// REST: 댓글 수정
function useUpdateComment() {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  return useMutation({
    mutationFn: async (newComment) => {
      // const commentUpdateURL = `${process.env.REACT_APP_SERVER}/comment/modify/${updateId}`;
      // return await axios
      //   .post(commentUpdateURL, {
      //     content: newComment.content,
      //   })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
    // 클라이언트 업데이트
    onMutate: (newComment) => {
      queryClient.setQueryData(["album", postId], (prevAlbum) => ({
        ...prevAlbum,
        commentResponseList: prevAlbum.commentResponseList.map((prevComment) =>
          prevComment.id === newComment.id ? newComment : prevComment
        ),
      }));
    },
  });
}

// REST: 댓글 삭제
function useDeleteComment() {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  return useMutation({
    mutationFn: async (commentId) => {
      const commentDeletionURL = `${process.env.REACT_APP_SERVER}/comment/delete/${commentId}`;
      // return await axios
      //   .delete(commentDeletionURL)
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
    // 클라이언트 업데이트
    onMutate: (commentId) => {
      queryClient.setQueryData(["album", postId], (prevAlbum) => ({
        ...prevAlbum,
        commentResponseList: prevAlbum.commentResponseList.filter(
          (prevComment) => prevComment.id !== commentId
        ),
      }));
    },
  });
}
export default Comment;
