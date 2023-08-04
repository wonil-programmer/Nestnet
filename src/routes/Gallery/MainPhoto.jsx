import styles from "./MainPhoto.module.css";

export default function MainPhoto({ mainImage }) {
  return (
    <>
      <img
        className={styles.mainPhoto}
        src={`${process.env.PUBLIC_URL}/assets/${mainImage}`}
        alt="img__main"
      />
    </>
  );
}
