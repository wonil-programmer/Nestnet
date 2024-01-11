import { useState, memo } from "react";
import Comment from "./Comment";

const AlbumDescription = ({ isAlbumLoading, metaData, comments }) => {
  const [selectedCommentId, setSelectedCommentId] = useState(0);

  return (
    <div className="w-full flex flex-col bg-white">
      <div className="flex flex-row w-full h-[5rem] p-6 border-y border-border-primary">
        {isAlbumLoading ? (
          <div>Loading...</div>
        ) : (
          <h2 className="text-lg my-auto">
            댓글
            <span className="ml-2">{comments.length}</span>
          </h2>
        )}
      </div>
      {isAlbumLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="body py-5 px-6 font-semibold">
            {metaData.bodyContent}
          </div>
          <ul className="commentsList w-full py-4 px-12 max-h-96 overflow-auto">
            <>
              {comments ? (
                comments.map((comment) => {
                  return (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      setSelectedCommentId={setSelectedCommentId}
                      isEditing={
                        selectedCommentId === comment.id ? true : false
                      }
                    />
                  );
                })
              ) : (
                <p class="text-base text-gray-600">
                  아직 댓글이 없습니다! 가장 먼저 댓글을 작성해보세요.
                </p>
              )}
            </>
          </ul>
        </>
      )}
    </div>
  );
};

export default memo(AlbumDescription);
