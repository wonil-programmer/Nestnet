import { memo } from "react";
import Comment from "../../components/Comments/Comment";
import { useSelector } from "react-redux";

const Comments = () => {
  // commentReducer(RTK)
  const comments = useSelector((state) => state.comment.comments);
  return (
    <>
      {comments && comments.length !== 0 ? (
        comments.map((comment) => (
          <Comment
            commentKey={comment.id}
            userName={comment.userName}
            content={comment.content}
            createdTime={comment.createdTime}
          />
        ))
      ) : (
        <p class="text-base text-gray-600">
          아직 댓글이 없습니다! 가장 먼저 댓글을 작성해보세요.
        </p>
      )}
    </>
  );
};

export default memo(Comments);
