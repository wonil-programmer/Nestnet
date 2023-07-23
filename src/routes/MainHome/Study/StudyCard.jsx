import styles from "./StudyCard.module.css";
function StudyCard() {
  return (
    <div className={styles.studyCard}>
      <div className={styles.top}>
        <h2>SQLD 자격증</h2>
      </div>
      <div className={styles.period}>23학년도 2학기</div>
      <div className={styles.icons}>
        <div className={styles.icon}></div>
        <div className={styles.icon}></div>
        <div className={styles.icon}></div>
      </div>
      <div className={styles.btm}>
        <span>신청자 11명</span>
        <button className={styles.btn}>자세히보기</button>
      </div>
    </div>
  );
}

export default StudyCard;
