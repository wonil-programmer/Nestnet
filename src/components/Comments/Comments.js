import styles from "./Comments.module.css";

function Comments() {
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
        <div className={styles.comments__list}></div>
      </div>
      <div className={styles.interaction}>
        <div className={styles.interaction__data}>
          <h3>댓글 16개</h3>
          <div>16 하트</div>
        </div>
        <div className={styles.comment}>
          <div className={styles.comment__profile}></div>
          <input
            className={styles.comment__input}
            type="text"
            placeholder="댓글 추가"
          />
        </div>
      </div>
    </>
  );
}

export default Comments;
