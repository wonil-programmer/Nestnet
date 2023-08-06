import { useState } from "react";
import CommentForm from "./CommentForm";
import styles from "./Comments.module.css";
import Comment from "./Comment";

function Comments({ albumData }) {
  const [comments, setComments] = useState([]);

  return (
    <>
      <div className={styles.comments}>
        <div className={styles.top}>
          <h3 className={styles.cnt}>
            댓글<span className={styles.commentsCnt}>{albumData.comments}</span>
          </h3>
          <div className={styles.btnDownld}>저장</div>
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

export default Comments;
