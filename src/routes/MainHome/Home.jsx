import Header from "../../components/Header";
import styles from "./Home.module.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import About from "../MainHome/About";

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
        <section
          id="mainSection"
          className={[styles.section, styles.maxContainer].join(" ")}
        >
          <About />
        </section>
        <section
          id="mainSection"
          className={[styles.section, styles.maxContainer].join(" ")}
        >
          <div>Net</div>
        </section>
        <section
          id="mainSection"
          className={[styles.section, styles.maxContainer].join(" ")}
        >
          <div>Next</div>
        </section>
      </div>
    </>
  );
}
export default Home;
