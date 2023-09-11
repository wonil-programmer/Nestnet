import { useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../../components/Comments/CommentForm";
import Comment from "../../components/Comments/Comment";
import DownloadBtn from "../../components/Button/DownloadBtn";
import { useEffect } from "react";
import axios from "axios";

export default function AlbumDescription({ albumData }) {
  const { id } = useParams();
  const url = `http://localhost:3004/album${id}`;
  const [isLoading, setIsLoading] = useState(true);

  console.log("앨범하단");
  // 댓글목록 api 호출
  useEffect(() => {
    const fetchComments = () => {
      axios?.get(url)?.then((res) => {
        setComments(res.data);
        setIsLoading(false);
      });
    };
    fetchComments();
  }, [url]);
  const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   setComments(data);
  // }, [data]);

  return (
    <div className="w-album-desWth m-auto mb-4 rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ">
      <div className="top px-8 pt-4 pb-2.5 text-center flex justify-between border-b border-border-primary">
        <h3 className="text-center pt-2.5">
          댓글
          <span className="ml-2">{comments.length}</span>
        </h3>
        <DownloadBtn />
      </div>
      <div>
        <div className="body w-full py-4 px-6 font-semibold overflow-auto">
          {albumData.body}
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
            // 댓글이 있을 경우 댓글 최신순으로 출력
            <>
              {comments && comments.length !== 0 ? (
                comments
                  .reverse()
                  .map((comment) => (
                    <Comment
                      commentKey={comment.id}
                      body={comment.body}
                      period={comment.period}
                      userId={comment.userId}
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
      <CommentForm setComments={setComments} albumData={albumData} />
    </div>
  );
}
