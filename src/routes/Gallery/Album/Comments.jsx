import { memo, useState, useContext } from "react";
import Comment from "./Comment";
import { CommentsContext } from "../../../context/CommentsContext";

const Comments = ({ comments }) => {
  // const { comments } = useContext(CommentsContext);
  const [selectedCommentId, setSelectedCommentId] = useState(0);

  return (
    <>
      {comments ? (
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
