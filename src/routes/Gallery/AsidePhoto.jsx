import styles from "./AsidePhoto.module.css";
export default function AsidePhoto({ id, coverImg, likes, alt, onClick }) {
  return (
    <div className={styles.photo} onClick={onClick}>
      <img
        className={styles.image}
        src={`${process.env.PUBLIC_URL}/assets/${coverImg}`}
        alt={alt}
      />
      <div className={styles.cover}></div>
    </div>
  );
}
