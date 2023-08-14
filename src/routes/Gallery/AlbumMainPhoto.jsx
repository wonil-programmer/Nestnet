import { useEffect, useState } from "react";
import styles from "./AlbumMainPhoto.module.css";
import { useImageSize } from "react-image-size";

export default function MainPhoto({ mainImage }) {
  const imgSrc = `${process.env.PUBLIC_URL}/assets/${mainImage}`;
  const [resize, setResize] = useState(false);
  const [dimensions, { isLoading, error }] = useImageSize(imgSrc);

  const visualContentHeight = 760;
  const visualContentRatio = 1.3;
  // 기존 이미지의 높이가 760px((Album.jsx의 visualContent의 높이)보다 크고,
  // 종횡비(너비/폭)가 1.3(Album.jsx의 visualContent의 종횡비(올림))보다 작은 경우 리사이징
  useEffect(() => {
    dimensions?.height > visualContentHeight &&
    dimensions?.width / dimensions?.height < visualContentRatio
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
