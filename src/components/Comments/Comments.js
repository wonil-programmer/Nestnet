import { useState } from "react";
import CommentForm from "./CommentForm";
import styles from "./Comments.module.css";

function Comments() {
  const [comments, setComments] = useState([]);

  return (
    <>
      <div>
        <h1 className={styles.title}>23학년도 1학기 개강총회</h1>
        <div className={styles.divider}>
          <div className={styles.divider__shadow}></div>
        </div>
      </div>
      <div className={styles.comments}>
        <h3 className={styles.comments__title}>댓글</h3>
        <div className={styles.comments__list}>
          <ul>
            {comments.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <CommentForm setComments={setComments} />
    </>
  );
}

export default Comments;
