import styles from "./AsidePhotos.module.css";
export default function AsidePhotos({ photos }) {
  return (
    <div className={styles.asidePhotos}>
      <div>test</div>
      {photos.map((photo) => (
        <div>
          <img
            className={styles.image}
            key={photo.id}
            src={`${process.env.PUBLIC_URL}/assets/${photo.src}`}
            alt={photo.alt}
          />
          <div className={styles.cover}></div>
        </div>
      ))}
    </div>
  );
}
