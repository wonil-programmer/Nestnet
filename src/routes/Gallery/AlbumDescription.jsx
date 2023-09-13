import { useState, memo } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../../components/Comments/CommentForm";
import Comment from "../../components/Comments/Comment";
import DownloadBtn from "./DownloadBtn";
import { useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";

const AlbumDescription = ({ albumId, albumData }) => {
  console.log("앨범 댓글창");
  const url = `http://localhost:3004/album${albumId}`;

  const [isLoading, setIsLoading] = useState(true);

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
      case "delete-comment":
        return {
          count: state.count - 1,
          comments: state.comments.filter(
            (comment) => comment.id !== action.payload.id
          ),
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
        setIsLoading(false);
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
        {/* <DownloadBtn /> */}
      </div>
      <div>
        <div className="body w-full py-4 px-6 font-semibold overflow-auto">
          {/* {albumData.body} */}
        </div>
        <ul className="commentsList w-full py-4 px-12 max-h-96 overflow-auto">
          {isLoading ? (
            // 댓글 로딩시 스켈레톤 효과
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full w-[2.3rem] h-[2.3rem] bg-slate-800 mr-6"></div>
              <div className="flex-1 space-y-4">
                <div className="w-96 h-2 bg-slate-800 rounded"></div>
                <div className="w-12 h-2 bg-slate-800 rounded"></div>
              </div>
            </div>
          ) : (
            // 댓글이 있을 경우 댓글 출력
            <>
              {commentsInfo.comments && commentsInfo.comments.length !== 0 ? (
                commentsInfo.comments.map((comment) => (
                  <Comment
                    commentKey={comment.id}
                    userId={comment.userId}
                    body={comment.body}
                    period={comment.period}
                    // dispatch={dispatch}
                  />
                ))
              ) : (
                <p class="text-base text-gray-600">
                  아직 댓글이 없습니다! 가장 먼저 댓글을 작성해보세요.
                </p>
              )}
            </>
          )}
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
