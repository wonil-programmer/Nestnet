import { useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "../../components/Comments/CommentForm";
import Comment from "../../components/Comments/Comment";
import DownloadBtn from "../../components/Button/DownloadBtn";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

export default function AlbumDescription({ albumData, mainImage }) {
  const { id } = useParams();
  // 댓글목록 api 호출
  const { data, isLoading } = useFetch(`http://localhost:3004/album${id}`);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(data);
  }, [data]);

  return (
    <>
      <div>
        <div className="top px-8 py-5 text-center flex justify-between border-b border-border-primary">
          <h3 className="text-center leading-9">
            댓글
            <span className="ml-2">{comments.length}</span>
          </h3>
          <DownloadBtn mainImage={mainImage} />
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
                      <Comment comment={comment} key={comment.id} />
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
      </div>
      <CommentForm setComments={setComments} albumData={albumData} />
    </>
  );
}
