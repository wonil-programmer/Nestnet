import { useEffect, useState } from "react";
import styles from "./MainPhoto.module.css";
import { useImageSize } from "react-image-size";
import { useRef } from "react";

export default function MainPhoto({ mainImage }) {
  const imgSrc = `${process.env.PUBLIC_URL}/assets/${mainImage}`;
  const [resize, setResize] = useState(false);
  const [dimensions, { isLoading, error }] = useImageSize(imgSrc);

  // 기존 이미지의 높이가 760px((Album.jsx의 visualContent의 높이)보다 크고,
  // 종횡비(너비/폭)가 1.3(Album.jsx의 visualContent의 종횡비(올림))보다 작은 경우 리사이징
  useEffect(() => {
    console.log(dimensions?.width / dimensions?.height);
    console.log(dimensions?.height);
    dimensions?.height > 760 && dimensions?.width / dimensions?.height < 1.3
      ? setResize(true)
      : setResize(false);
  }, [dimensions]);

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <img
          className={resize ? styles.reSize : styles.sameSize}
          src={imgSrc}
          alt="img__main"
        />
      )}
    </>
  );
}
