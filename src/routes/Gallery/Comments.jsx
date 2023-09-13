import { memo } from "react";
import Comment from "../../components/Comments/Comment";

const Comments = ({ commentsInfo }) => {
  return (
    <>
      {commentsInfo.comments && commentsInfo.comments.length !== 0 ? (
        commentsInfo.comments.map((comment) => (
          <Comment
            commentKey={comment.id}
            userId={comment.userId}
            body={comment.body}
            period={comment.period}
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
