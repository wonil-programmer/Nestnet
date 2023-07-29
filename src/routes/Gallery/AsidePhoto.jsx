import styles from "./AsidePhoto.module.css";

export default function AsidePhoto({ photo, onClick }) {
  return (
    <div>
      <img
        className={styles.image}
        key={photo.id}
        src={`${process.env.PUBLIC_URL}/assets/${photo.src}`}
        alt={photo.alt}
        onClick={onClick}
      />
      <div className={styles.cover}></div>
    </div>
  );
}
