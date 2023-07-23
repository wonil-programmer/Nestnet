import StudyCard from "./StudyCard";
import styles from "./Study.module.css";
function Study() {
  return (
    <>
      <ul class={styles.studyList}>
        <li>
          <StudyCard />
        </li>
        <li>
          <StudyCard />
        </li>
        <li>
          <StudyCard />
        </li>
        <li>
          <StudyCard />
        </li>
        <li>
          <StudyCard />
        </li>
        <li>
          <StudyCard />
        </li>
      </ul>
    </>
  );
}
export default Study;
