import { useEffect } from "react";
import styles from "./MainPhoto.module.css";
import { useImageSize } from "react-image-size";

export default function MainPhoto({ mainImage }) {
  const [dimensions, { isLoading, error }] = useImageSize(
    `${process.env.PUBLIC_URL}/assets/${mainImage}`
  );
  useEffect(() => {
    console.log(dimensions?.width);
  }, [dimensions]);
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <img
          className={styles.mainPhoto}
          src={`${process.env.PUBLIC_URL}/assets/${mainImage}`}
          alt="img__main"
        />
      )}
    </>
  );
}
