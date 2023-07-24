import Header from "../../components/Header";
import styles from "./Home.module.css";
import { useRef } from "react";
import About from "./About/About";
import Study from "./Study/Study";
import Achievements from "./Achievements/Achievements";

function Home() {
  const sectionRef = useRef(null);
  function scrollToIndex(index) {
    const sectionNode = sectionRef.current;
    const titleNode = sectionNode.querySelectorAll(`section[id="mainSection"]`)[
      index
    ];
    titleNode.scrollIntoView({
      behavior: "smooth",
    });
  }
  return (
    <>
      <Header scrollToIndex={scrollToIndex} />
      <div className={styles.sectionRef} ref={sectionRef}>
        <section id="mainSection" className={styles.section}>
          <h2 className={styles.mainTitle}>About Us</h2>
          <p className={styles.secDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            voluptatum, expedita provident quaerat earum voluptatem iure
            deserunt dicta numquam pariatur harum a beatae delectus
            exercitationem, dolore natus eaque quam facilis!
          </p>
          <About />
        </section>
        <section id="mainSection" className={styles.section}>
          <h2 className={styles.mainTitle}>Study</h2>
          <p className={styles.secDescription}>진행 중인 스터디</p>
          <Study />
        </section>
        <section id="mainSection" className={styles.section}>
          <h2 className={styles.mainTitle}>History</h2>
          <p className={styles.secDescription}>
            더 나은 내일을 위해 정진하는 우리
          </p>
          <Achievements />
        </section>
      </div>
    </>
  );
}
export default Home;
