import Header from "../../components/Header";
import styles from "./Home.module.css";
import Advantage from "./Advantages/Advantage";
import ImgAdvantages from "../../images/MainHome/ImgAdvantages";
import Study from "./Study/Study";
import Achievements from "./Achievements/Achievements";
import { useEffect, useState } from "react";

class SectAdv {
  constructor(title, description, imgSrc) {
    this.title = title;
    this.description = description;
    this.imgSrc = imgSrc;
  }
}
const SectAdvs = [
  new SectAdv(
    "웬만한 건 다 있을 걸",
    "소프트웨어학부 학술 동아리 중 가장 많은 시험 정보 보유!",
    ImgAdvantages[0]
  ),
  new SectAdv(
    "웬만한 건 다 있을 걸",
    "소프트웨어학부 학술 동아리 중 가장 많은 시험 정보 보유!",
    ImgAdvantages[1]
  ),
  new SectAdv(
    "웬만한 건 다 있을 걸",
    "소프트웨어학부 학술 동아리 중 가장 많은 시험 정보 보유!",
    ImgAdvantages[2]
  ),
];
function Home() {
  const [advantages, setAdvantages] = useState([]);
  useEffect(() => {
    setAdvantages(SectAdvs);
  }, []);
  return (
    <>
      <Header />
      {advantages.map((ele, idx) => (
        <section key={idx} className={styles.section}>
          <Advantage
            title={ele.title}
            description={ele.description}
            imgSrc={ele.imgSrc}
          ></Advantage>
        </section>
      ))}
      <section id="mainSection" className={styles.section}>
        <p className={styles.mainTitle}>진행 중인 스터디</p>
        <Study />
      </section>
      <section id="mainSection" className={styles.section}>
        <h2 className={styles.mainTitle}>History</h2>
        <p className={styles.secDescription}>
          더 나은 내일을 위해 정진하는 우리
        </p>
        <Achievements />
      </section>
    </>
  );
}
export default Home;
