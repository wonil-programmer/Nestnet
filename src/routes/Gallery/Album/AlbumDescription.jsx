import { useState, memo } from "react";
import Comment from "./Comment";

const AlbumDescription = ({
  isAlbumLoading,
  metaData,
  comments,
  isDescriptionVisible,
}) => {
  const [selectedCommentId, setSelectedCommentId] = useState(0);

  return (
    <>
      {isDescriptionVisible ? (
        <div className="w-full flex flex-col bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <div className="flex flex-row w-full h-[5rem] p-6 px-8 border-y border-border-primary">
            {isAlbumLoading ? (
              <div>
                {/* 로딩 스켈레톤 */}
                Loading...
              </div>
            ) : (
              <h2 className="text-lg my-auto">
                댓글
                <span className="ml-2">{comments.length}</span>
              </h2>
            )}
          </div>
          {isAlbumLoading ? (
            <div>
              {/* 로딩 스켈레톤 */}
              Loading...
            </div>
          ) : (
            <>
              <div className="body py-5 px-8 font-semibold">
                {metaData.bodyContent}
              </div>
              <ul className="commentsList w-full py-4 px-12 max-h-96 overflow-auto">
                <>
                  {comments.length ? (
                    comments.map((comment) => {
                      return (
                        <Comment
                          key={comment.id}
                          comment={comment}
                          setSelectedCommentId={setSelectedCommentId}
                          isUpdating={
                            selectedCommentId === comment.id ? true : false
                          }
                        />
                      );
                    })
                  ) : (
                    <p className="text-base text-gray-600">
                      아직 댓글이 없습니다! 가장 먼저 댓글을 작성해보세요.
                    </p>
                  )}
                </>
              </ul>
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default memo(AlbumDescription);
