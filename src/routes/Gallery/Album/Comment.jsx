import { useContext, useRef, useState } from "react";
import { CommentsContext } from "../../../context/CommentsContext";

/**
 * 단건 댓글
 * @param { comment, setSelectedCommentId, isEditing } param0
 * @returns
 */
const Comment = ({ comment, setSelectedCommentId, isEditing }) => {
  const { id: commentId, username, content, createdTime } = comment;

  const { comments, setComments } = useContext(CommentsContext);

  const [editValue, setEditValue] = useState(comment.content);
  const editInputRef = useRef(null);

  const editComment = ({ editTargetId, newContent }) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === editTargetId
          ? { ...comment, content: newContent }
          : comment
      )
    );
  };

  const handleCommentEdit = (commentIdToEdit) => {
    setSelectedCommentId(commentIdToEdit);
  };

  const handleEditComplete = () => {
    editComment({ editTargetId: commentId, newContent: editValue });
    setSelectedCommentId(0);
  };

  const onCommentDelete = (commentIdToDelete) => {
    setComments(comments.filter((comment) => comment.id !== commentIdToDelete));
  };

  /**
   * 수정 중인 댓글 컴포넌트
   */
  const editInput = (
    <input
      onChange={() => setEditValue(editInputRef.current.value)}
      className="flex w-full h-[2rem] px-6 border-b border-red-300 focus:outline-none focus:border-red-500"
      type="text"
      value={editValue}
      ref={editInputRef}
      onKeyDown={(e) => (e.key === "Enter" ? handleEditComplete() : null)}
    />
  );

  return (
    <>
      <li className="w-full" key={commentId}>
        <div className="w-full flex pb-4">
          <div className="profile flex flex-col justify-center mr-6">
            <div className="w-[2.3rem] h-[2.3rem] rounded-3xl bg-slate-900">
              <div>{username}</div>
              <img className="" src="" alt="" />
            </div>
          </div>
          <div className="w-full break-all">
            {isEditing ? (
              editInput
            ) : (
              <div className="w-full whitespace-normal">{content}</div>
            )}
            <div className="flex flex-row justify-end mt-2 pr-4 text-[0.8rem]">
              <button
                className="mr-2"
                onClick={() => onCommentDelete(commentId)}
              >
                삭제
              </button>
              <button onClick={() => handleCommentEdit(commentId)}>수정</button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Comment;
