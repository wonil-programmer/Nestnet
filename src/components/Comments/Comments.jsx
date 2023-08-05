import { useState } from "react";
import CommentForm from "./CommentForm";
import styles from "./Comments.module.css";
import Comment from "./Comment";

function Comments() {
  const [comments, setComments] = useState([]);

  return (
    <>
      <div className={styles.comments}>
        <div className={styles.top}>
          <h3 className={styles.cnt}>
            댓글 <span>4개</span>
          </h3>
          <div className={styles.btnDownld}>저장</div>
        </div>
        <div>
          <ul className={styles.comments__list}>
            {comments.map((item, index) => (
              <Comment comment={item} key={index} />
            ))}
          </ul>
        </div>
      </div>
      <CommentForm setComments={setComments} />
    </>
  );
}

export default Comments;
