import StudyCard from "./StudyCard.tsx";
import styles from "./Study.module.css";
import useFetch from "../../../hooks/useFetch.js";
function Study() {
  const studies = useFetch("http://localhost:3001/studies");
  return (
    <div>
      <ul className={styles.studyList}>
        {studies.map((study, idx) => (
          <li key={idx}>
            <StudyCard study={study}></StudyCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Study;
