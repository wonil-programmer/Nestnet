import { useDispatch } from "react-redux";
import { deleteComment } from "../../routes/Gallery/commentReducer";

const Comment = ({ commentId, userName, content, createdTime }) => {
  const commentDispatch = useDispatch();
  const onCommentDelete = (commentId) => {
    commentDispatch(deleteComment(commentId));
  };
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
            <div className="w-full whitespace-normal">{content}</div>
            <div className="flex mt-2 pr-8 text-[0.9rem]">
              <span className="mr-4">{createdTime}</span>
              <button onClick={() => onCommentDelete(commentId)}>삭제</button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Comment;
