import styles from "./AsidePhoto.module.css";
export default function AsidePhoto({ photos }) {
  return (
    <div className={styles.photos}>
      <div>test</div>
      {/* {photos.map((photo) => (
        <div>
          <img
            className={styles.image}
            src={`${process.env.PUBLIC_URL}/assets/${photo.src}`}
            alt={photo.alt}
          />
          <div className={styles.cover}></div>
        </div>
      ))} */}
    </div>
  );
}
