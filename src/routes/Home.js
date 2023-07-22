import NavBar from "../components/Header";
import styles from "./Home.module.css";
import { useRef } from "react";

function Home() {
  const sectionRef = useRef(null);
  function scrollToIndex(index) {
    const sectionNode = sectionRef.current;
    const titleNode =
      sectionNode.querySelectorAll(`div[id="mainTitle"]`)[index];
    titleNode.scrollIntoView({
      behavior: "smooth",
    });
  }
  return (
    <>
      <NavBar />
      <button onClick={() => scrollToIndex(0)}>Nest</button>
      <button onClick={() => scrollToIndex(1)}>Net</button>
      <button onClick={() => scrollToIndex(2)}>Next</button>
      <div ref={sectionRef}>
        <section className={styles.sec1}>
          <div id="mainTitle">Nest</div>
        </section>
        <section className={styles.sec2}>
          <div id="mainTitle">Net</div>
        </section>
        <section className={styles.sec3}>
          <div id="mainTitle">Next</div>
        </section>
      </div>
    </>
  );
}
export default Home;
