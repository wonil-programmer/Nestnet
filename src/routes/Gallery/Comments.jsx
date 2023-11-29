import { memo } from "react";
import Comment from "./Comment";
/**
 * 댓글 데이터
 */
const Comments = ({ comments }) => {
  const [selectedCommentId, setSelectedCommentId] = 0;

  return (
    <>
      {comments && comments.length !== 0 ? (
        comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              setSelectedCommentId={setSelectedCommentId}
              isEditing={selectedCommentId === comment.id ? true : false}
            />
          );
        })
      ) : (
        <p class="text-base text-gray-600">
          아직 댓글이 없습니다! 가장 먼저 댓글을 작성해보세요.
        </p>
      )}
    </>
  );
};

export default memo(Comments);
