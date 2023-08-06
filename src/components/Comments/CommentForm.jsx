import { useState } from "react";
import styles from "./CommentForm.module.css";

function CommentFooter({ setComments, albumData }) {
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
        <div className={styles.visits}>
          조회수
          <span className={styles.visitsCnt}>{albumData.visits}</span>
        </div>
        <div className={styles.likes}>
          좋아요
          <span className={styles.likesCnt}>{albumData.likes}</span>
        </div>
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
