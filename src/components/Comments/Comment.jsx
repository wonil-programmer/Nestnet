import styles from "./Comment.module.css";
const Comment = ({ comment, key: id }) => {
  return (
    <>
      <li className={styles.item} key={id}>
        <div className={styles.cmtBox}>
          <div className={styles.profile}>
            <div className={styles.imgWrapper}>
              <div>{comment.userId}</div>
              <img className={styles.img} src="" alt="" />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.comment}>{comment.body}</div>
            <div className={styles.ex}>
              <span className={styles.period}>{comment.period}</span>
              <div className={styles.replies}>답글</div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Comment;
