import { useState } from "react";
import styles from "./CommentForm.module.css";

function CommentFooter({ setComments }) {
  const [comment, setComment] = useState("");
  const onChange = (event) => setComment(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (comment === "") {
      return;
    }
    setComments((currentInput) => [comment, ...currentInput]);
    setComment("");
  };
  return (
    <div className={styles.interaction}>
      <div className={styles.interaction__data}>
        <div>16 하트</div>
      </div>
      <div>
        <div className={styles.comment__profile}></div>
        <form onSubmit={onSubmit} className={styles.comment__form}>
          <input
            onChange={onChange}
            className={styles.comment__input}
            type="text"
            placeholder="댓글 추가"
          />
        </form>
      </div>
    </div>
  );
}

export default CommentFooter;
