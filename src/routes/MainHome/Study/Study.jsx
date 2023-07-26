import { useState, useEffect } from "react";
import StudyCard from "./StudyCard";
import styles from "./Study.module.css";
function Study() {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/studies")
      .then((res) => res.json())
      .then((data) => {
        setStudies(data);
      });
  }, []);
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
