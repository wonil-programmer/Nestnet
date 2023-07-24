import Header from "../../components/Header";
import styles from "./Home.module.css";
import { useRef } from "react";
import { SectionsContainer, Section } from "react-fullpage";
import About from "./About/About";
import Study from "./Study/Study";
import Achievements from "./Achievements/Achievements";

function Home() {
  let options = {
    anchors: ["sectionOne", "sectionTwo", "sectionThree"],
    sectionPaddingTop: "5rem",
  };
  return (
    <>
      <Header />
      <SectionsContainer {...options}>
        <Section id="mainSection" className={styles.section}>
          <p className={styles.secDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            voluptatum, expedita provident quaerat earum voluptatem iure
            deserunt dicta numquam pariatur harum a beatae delectus
            exercitationem, dolore natus eaque quam facilis!
          </p>
          <About />
        </Section>
        <Section id="mainSection" className={styles.section}>
          <h2 className={styles.mainTitle}>Study</h2>
          <p className={styles.secDescription}>진행 중인 스터디</p>
          <Study />
        </Section>
        <Section id="mainSection" className={styles.section}>
          <h2 className={styles.mainTitle}>History</h2>
          <p className={styles.secDescription}>
            더 나은 내일을 위해 정진하는 우리
          </p>
          <Achievements />
        </Section>
      </SectionsContainer>
    </>
  );
}
export default Home;
