import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  deleteComment,
  editComment,
  editCommentDispatch,
  setSelectedCommentId,
} from "../../routes/Gallery/commentReducer";
import { useState } from "react";

const Comment = ({ commentId, userName, content, createdTime, isEditing }) => {
  const [editValue, setEditValue] = useState(content);
  const editInputRef = useRef(null);

  const deleteCommentDispatch = useDispatch();
  const editCommentDispatch = useDispatch();
  const onCommentDelete = (commentId) => {
    deleteCommentDispatch(deleteComment(commentId));
  };
  const handleCommentEdit = (commentId) => {
    editCommentDispatch(setSelectedCommentId(commentId));
  };
  const handleEditComplete = () => {
    editCommentDispatch(
      editComment({ targetIndex: commentId, newContent: editValue })
    );
    editCommentDispatch(setSelectedCommentId(0));
  };

  const editInput = (
    <input
      onChange={() => setEditValue(editInputRef.current.value)}
      className="flex w-full h-full py-0 px-6 bg-[#efefef] border-none rounded-3xl outline-4 outline-red-300"
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
              <div>{userName}</div>
              <img className="" src="" alt="" />
            </div>
          </div>
          <div className="w-full break-all">
            {isEditing ? (
              editInput
            ) : (
              <div className="w-full whitespace-normal">{content}</div>
            )}
            <div className="flex mt-2 pr-8 text-[0.9rem]">
              <span className="mr-4">{createdTime}</span>
              <button onClick={() => onCommentDelete(commentId)}>삭제</button>
              <button onClick={() => handleCommentEdit(commentId)}>수정</button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Comment;
