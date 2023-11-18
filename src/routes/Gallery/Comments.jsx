import { memo } from "react";
import Comment from "./Comment";
import { useContext } from "react";
import { CommentContext } from "../../context/CommentContext";

/**
 * 댓글 데이터
 */
const Comments = () => {
  const [selectedCommentId, setSelectedCommentId] = 0;
  const comments = useContext(CommentContext);

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
