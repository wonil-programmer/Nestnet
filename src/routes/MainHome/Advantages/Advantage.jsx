import styles from "./Advantage.module.css";

function Advantage({ title, description, imgSrc }) {
  return (
    <>
      <div className={styles.advantage}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <img className={styles.img} src={imgSrc} alt="advantage" />
    </>
  );
}

export default Advantage;
