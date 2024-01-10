import { memo, useContext } from "react";
import CommentForm from "../../components/Comments/CommentForm";
import Comments from "./Comments";
import DownloadBtn from "./DownloadBtn";
import { CommentsContext } from "../../context/CommentsContext";

/**
 * 앨범 하단뷰 - 앨범정보, 댓글창, 댓글입력창
 * @param {metaData}
 * @returns
 */
const AlbumDescription = ({ metaData }) => {
  const { comments } = useContext(CommentsContext);

  return (
    <div className="w-album-desWth m-auto mb-4 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ">
      <div className="top px-8 pt-4 pb-2.5 text-center flex justify-between border-b border-border-primary">
        <h3 className="text-center pt-2.5">
          댓글
          <span className="ml-2">{comments.length}</span>
        </h3>
      </div>
      <div>
        <div className="body w-full py-4 px-6 font-semibold overflow-auto">
          {metaData.bodyContent}
        </div>
        <ul className="commentsList w-full py-4 px-12 max-h-96 overflow-auto">
          {/* <Comments /> */}
        </ul>
      </div>
      {/* <CommentForm
        viewCount={metaData.viewCount}
        likeCount={metaData.likeCount}
      /> */}
    </div>
  );
};

export default memo(AlbumDescription);
