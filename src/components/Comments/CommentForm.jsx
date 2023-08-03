import { useState } from "react";
import styles from "./CommentForm.module.css";

function CommentFooter({ setComments }) {
  const [comment, setComment] = useState("");
  const onChange = (event) => {
    setComment(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (comment === "") {
      return;
    }
    setComments((currentInput) => [comment, ...currentInput]);
    setComment("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <div className={styles.visits}>조회 수 100회</div>
        <div className={styles.likes}>좋아요 16개</div>
      </div>
      <div className={styles.form}>
        <div className={styles.profile}></div>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            className={styles.input}
            value={comment}
            type="text"
            placeholder="댓글 추가"
          />
        </form>
      </div>
    </div>
  );
}

export default CommentFooter;
