import styles from "./Comment.module.css";
const Comment = ({ comment, index }) => {
  return (
    <>
      <li className={styles.item} key={index}>
        <div className={styles.cmtBox}>
          <div className={styles.profile}>
            <div className={styles.imgWrapper}>
              <img className={styles.img} src="" alt="" />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.comment}>{comment}</div>
            <div className={styles.ex}>
              <span className={styles.period}>1년 전</span>
              <div className={styles.replies}>답글</div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Comment;
