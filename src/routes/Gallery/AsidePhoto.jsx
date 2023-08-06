import styles from "./AsidePhoto.module.css";

export default function AsidePhoto({ photo, onClick }) {
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.image}
        key={photo.id}
        src={`${process.env.PUBLIC_URL}/assets/${photo.src}`}
        alt={photo.alt}
      />
      <div className={styles.cover}>
        <button onClick={onClick}>돋보기</button>
      </div>
    </div>
  );
}
