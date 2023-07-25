import styles from "./StudyCard.module.css";
function StudyCard({ study }) {
  return (
    <div className={styles.studyCard}>
      <div className={styles.top}>
        <h2>{study.name}</h2>
      </div>
      <div className={styles.period}>{study.period}</div>
      <div className={styles.icons}>
        {study.image.map((img, idx) => (
          <img key={idx} src={img.src} alt="study-logo"></img>
        ))}
      </div>
      <div className={styles.btm}>
        <span>{study.applicantsNum}</span>
        <button className={styles.btn}>자세히보기</button>
      </div>
    </div>
  );
}

export default StudyCard;
