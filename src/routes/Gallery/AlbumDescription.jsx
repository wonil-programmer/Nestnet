import { useState } from "react";
import CommentForm from "../../components/Comments/CommentForm";
import Comment from "../../components/Comments/Comment";
import DownloadBtn from "../../components/Button/DownloadBtn";

export default function AlbumDescription({ albumData, mainImage }) {
  const [comments, setComments] = useState([]);
  return (
    <>
      <div>
        <div class="top px-8 py-5 text-center flex justify-between border-b border-border-primary">
          <h3 class="text-center leading-9">
            댓글
            <span class="ml-2">{albumData.comments}</span>
          </h3>
          <DownloadBtn mainImage={mainImage} />
        </div>
        <div>
          <div class="body w-full py-4 px-6 font-semibold overflow-auto">
            {albumData.body}
          </div>
          <ul class="commentsList w-full py-4 px-12 max-h-96 overflow-auto">
            {/* api 호출 후 댓글 0개 일 때, 대체 텍스트 작성 */}
            {comments.map((item, index) => (
              <Comment comment={item} key={index} />
            ))}
          </ul>
        </div>
      </div>
      <CommentForm setComments={setComments} albumData={albumData} />
    </>
  );
}
