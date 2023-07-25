import StudyCard from "./StudyCard";
import styles from "./Study.module.css";
import data from "../../../db/study.json";
function Study() {
  const validStudies = data.studies.filter((study) => study.end === false);
  return (
    <div>
      <ul class={styles.studyList}>
        {validStudies.map((study, idx) => (
          <li key={idx}>
            <StudyCard study={study}></StudyCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Study;
