import { memo } from "react";
import CommentForm from "../../components/Comments/CommentForm";
import Comments from "./Comments";
import DownloadBtn from "./DownloadBtn";
import { useSelector } from "react-redux";

const AlbumDescription = () => {
  console.log("앨범 댓글창");

  // const commentReducer = (state, action) => {
  //   switch (action.type) {
  //     case "SET_COMMENT_INPUT":
  //       return { ...state, newComment: action.payload };
  //     case "SET_COMMENTS":
  //       return {
  //         count: action.payload.commentsData.length,
  //         comments: action.payload.commentsData,
  //         newComment: "",
  //       };
  //     default:
  //       return state;
  //   }
  // };

  const bodyContent = useSelector((state) => state.album.bodyContent);
  const commentsCount = useSelector((state) => state.comment.count);

  return (
    <div className="w-album-desWth m-auto mb-4 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ">
      <div className="top px-8 pt-4 pb-2.5 text-center flex justify-between border-b border-border-primary">
        <h3 className="text-center pt-2.5">
          댓글
          <span className="ml-2">{commentsCount}</span>
        </h3>
        <DownloadBtn />
      </div>
      <div>
        <div className="body w-full py-4 px-6 font-semibold overflow-auto">
          {bodyContent}
        </div>
        <ul className="commentsList w-full py-4 px-12 max-h-96 overflow-auto">
          <Comments />
        </ul>
      </div>
      <CommentForm />
    </div>
  );
};

export default memo(AlbumDescription);
