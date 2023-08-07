import { useEffect } from "react";
import styles from "./MainPhoto.module.css";
import { useImageSize } from "react-image-size";
import { useRef } from "react";

export default function MainPhoto({ mainImage }) {
  const imgSrc = `${process.env.PUBLIC_URL}/assets/${mainImage}`;
  const reSize = useRef(false);
  const [dimensions, { isLoading, error }] = useImageSize(imgSrc);

  // 종횡비(너비 / 폭)가 1.4(Album.jsx의 visualContent의 종횡비(올림))보다 작은 경우, 리사이징
  // const handleSize = () => {
  // }
  useEffect(() => {
    if (dimensions) {
      if (dimensions?.width / dimensions?.height < 1.4) {
        console.log(reSize.current);
        reSize.current = !reSize.current;
        console.log("리사이징!");
        console.log(reSize.current);
      }
    }
  }, [dimensions]);
  useEffect(() => {
    console.log("렌더링!!!");
  });
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <img className={styles.mainPhoto} src={imgSrc} alt="img__main" />
      )}
    </>
  );
}
