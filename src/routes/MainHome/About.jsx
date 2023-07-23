import AboutImgArr from "../../images/MainHome/AboutImg";
import { Link } from "react-router-dom";
import styles from "./About.module.css";
function About() {
  return (
    <>
      <h2 className={styles.mainTitle}>About Us</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        voluptatum, expedita provident quaerat earum voluptatem iure deserunt
        dicta numquam pariatur harum a beatae delectus exercitationem, dolore
        natus eaque quam facilis!
      </p>
      <ul className={styles.items}>
        <li className={styles.item}>
          <div className={styles.imgWrapper}>
            <img
              className={styles.img}
              src={AboutImgArr[0]}
              alt="advantageImg"
            />
            <Link className={styles.link}>
              <p>페이지로 이동</p>
            </Link>
          </div>
          <p class={styles.subTitle}>풍부한 정보</p>
          <p class={styles.subDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            necessitatibus nostrum provident, eos, temporibus beatae quibusdam
            tempore consequuntur nemo praesentium neque adipisci aperiam nisi?
            Recusandae nulla accusantium quam voluptatibus illum!
          </p>
        </li>
        <li className={styles.item}>
          <div className={styles.imgWrapper}>
            <img
              className={styles.img}
              src={AboutImgArr[1]}
              alt="advantageImg"
            />
            <Link className={styles.link}>
              <p>페이지로 이동</p>
            </Link>
          </div>
          <p class={styles.subTitle}>활발한 활동</p>
          <p class={styles.subDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            necessitatibus nostrum provident, eos, temporibus beatae quibusdam
            tempore consequuntur nemo praesentium neque adipisci aperiam nisi?
            Recusandae nulla accusantium quam voluptatibus illum!
          </p>
        </li>
        <li className={styles.item}>
          <div className={styles.imgWrapper}>
            <img
              className={styles.img}
              src={AboutImgArr[2]}
              alt="advantageImg"
            />
            <Link className={styles.link}>
              <p>페이지로 이동</p>
            </Link>
          </div>
          <p class={styles.subTitle}>편안한 동방</p>
          <p class={styles.subDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
            necessitatibus nostrum provident, eos, temporibus beatae quibusdam
            tempore consequuntur nemo praesentium neque adipisci aperiam nisi?
            Recusandae nulla accusantium quam voluptatibus illum!
          </p>
        </li>
      </ul>
    </>
  );
}

export default About;
