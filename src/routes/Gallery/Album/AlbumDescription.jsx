import { useState, memo, useEffect } from "react";
import Comment from "./Comment";
import { useQuery } from "@tanstack/react-query";

/**
 * 댓글창(앨범의 메타데이터 포함)
 * @param {boolean, boolean, Object, Object}
 * @returns
 */
const AlbumDescription = ({
  isAlbumLoading,
  isDescriptionVisible,
  postMetaData,
  comments,
}) => {
  return (
    <>
      {isDescriptionVisible ? (
        <div className="w-full flex flex-col bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
          <div className="flex flex-row w-full h-[5rem] p-6 px-8 border-y border-border-primary">
            {isAlbumLoading ? (
              <div>
                {/* 로딩 스피너 */}
                Loading...
              </div>
            ) : (
              <div className="bodyContent text-md my-auto font-semibold">
                {postMetaData.bodyContent}
              </div>
            )}
          </div>
          {isAlbumLoading ? (
            <div>
              {/* 로딩 스피너 */}
              Loading...
            </div>
          ) : (
            <>
              <h2 className="text-md py-5 px-8">
                댓글
                <span className="ml-2">{comments.length}</span>
              </h2>

              <ul className="commentsList w-full py-4 px-12 max-h-96 overflow-auto">
                <>
                  {comments.length ? (
                    comments.map((comment) => {
                      return (
                        <Comment
                          key={comment.id}
                          comment={comment}
                          isAlbumLoading={isAlbumLoading}
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
