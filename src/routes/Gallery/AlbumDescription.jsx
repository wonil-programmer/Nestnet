import { memo } from "react";
import CommentForm from "../../components/Comments/CommentForm";
import Comments from "./Comments";
import DownloadBtn from "./DownloadBtn";
import { useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";

const AlbumDescription = ({ albumId, albumData }) => {
  console.log("앨범 댓글창");

  const url = `http://localhost:3004/album${albumId}`;

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_COMMENT_INPUT":
        return { ...state, newComment: action.payload };
      case "SET_COMMENTS":
        return {
          count: action.payload.commentsData.length,
          comments: action.payload.commentsData,
          newComment: "",
        };
      default:
        return state;
    }
  };
  const initialState = {
    count: 0,
    comments: [],
    newComment: "",
  };
  const [commentsInfo, dispatch] = useReducer(reducer, initialState);

  // 댓글목록 api 호출
  useEffect(() => {
    const fetchComments = () => {
      axios?.get(url)?.then((res) => {
        initialState.comments = res.data;
        initialState.count = res.data.length;
      });
    };
    fetchComments();
  }, [url]);

  return (
    <div className="w-album-desWth m-auto mb-4 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ">
      <div className="top px-8 pt-4 pb-2.5 text-center flex justify-between border-b border-border-primary">
        <h3 className="text-center pt-2.5">
          댓글
          <span className="ml-2">{commentsInfo.count}</span>
        </h3>
        <DownloadBtn />
      </div>
      <div>
        <div className="body w-full py-4 px-6 font-semibold overflow-auto">
          {albumData.body}
        </div>
        <ul className="commentsList w-full py-4 px-12 max-h-96 overflow-auto">
          <Comments commentsInfo={commentsInfo} />
        </ul>
      </div>
      <CommentForm
        dispatch={dispatch}
        commentEntered={commentsInfo.newComment}
        albumData={albumData}
      />
    </div>
  );
};

export default memo(AlbumDescription);
