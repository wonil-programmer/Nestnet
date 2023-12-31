import styles from "./StudyCard.module.css";
import { useState } from "react";
import React from "react";

interface Iprops {
  study: IStudy;
}
interface IIcon {
  id: number;
  src: string;
}
interface IStudy {
  id: number;
  name: string;
  period: string;
  icons: IIcon[];
  applicantsNum: number;
  end: boolean;
  isEnrolled: boolean;
}

function StudyCard({ study }: Iprops) {
  const [isEnrolled, setIsEnrolled] = useState(study.isEnrolled);
  const toggleEnrolled = () => {
    fetch(`http://localhost:3001/studies/${study.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...study,
        isEnrolled: !isEnrolled,
      }),
    }).then((res) => {
      setIsEnrolled(!isEnrolled);
    });
  };

  return (
    <div className={isEnrolled ? styles.off : styles.on}>
      <div className={styles.top}>
        <h2 className={styles.name}>{study.name}</h2>
      </div>
      <div className={styles.period}>{study.period}</div>
      <div className={styles.icons}>
        {study.icons.map((img, idx) => (
          <img
            className={styles.icon}
            key={idx}
            src={img.src}
            alt="study-logo"
          ></img>
        ))}
      </div>
      <div className={styles.btm}>
        <span>{study.applicantsNum}명</span>
        <button className={styles.btn} onClick={toggleEnrolled}>
          자세히보기
        </button>
      </div>
    </div>
  );
}

export default StudyCard;
