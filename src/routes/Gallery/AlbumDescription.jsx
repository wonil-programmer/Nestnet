import { useState } from "react";
import styles from "./AlbumDescription.module.css";
import CommentForm from "../../components/Comments/CommentForm";
import Comment from "../../components/Comments/Comment";
import DownloadBtn from "../../components/Button/DownloadBtn";

export default function AlbumDescription({ albumData, mainImage }) {
  const [comments, setComments] = useState([]);
  return (
    <>
      <div className={styles.comments}>
        <div className={styles.top}>
          <h3 className={styles.commentsCnt}>
            댓글
            <span className={styles.commentsCntNum}>{albumData.comments}</span>
          </h3>
          <DownloadBtn mainImage={mainImage} />
        </div>
        <div>
          <div className={styles.body}>{albumData.body}</div>
          <ul className={styles.comments__list}>
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
