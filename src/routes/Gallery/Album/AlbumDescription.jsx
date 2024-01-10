import { memo } from "react";
import Comments from "./Comments";

const AlbumDescription = ({ isAlbumLoading, metaData, commentData }) => {
  console.log(commentData);
  return (
    <div className="w-full flex flex-col bg-white">
      <div className="flex flex-row w-full h-[5rem] p-6 border-y border-border-primary">
        {isAlbumLoading ? (
          <div>Loading...</div>
        ) : (
          <h2 className="text-lg my-auto">
            댓글
            <span className="ml-2">{commentData.length}</span>
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
            <Comments comments={commentData} />
          </ul>
        </>
      )}
    </div>
  );
};

export default memo(AlbumDescription);
