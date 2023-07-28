import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Album.module.css";
import Comments from "../../components/Comments/Comments";
import Button from "../../components/Button";
import Header from "../../components/Header";
import useFetch from "../../hooks/useFetch";
import AsidePhoto from "./AsidePhoto";

function Album() {
  const { id } = useParams();
  const album = useFetch(`http://localhost:3001/galleries?id=${id}`);

  // useEffect(() => {
  //   if (album.length > 0) {
  //     setLoading(false);
  //   }
  // }, [album]);
  // const [clickedImage, setClickedImage] = useState("");

  // const handleImageClick = (imagePath) => {
  //   setClickedImage(imagePath);
  // };
  // const swapImages = useCallback(() => {
  //   if (clickedImage) {
  //     setMainImage(clickedImage);
  //   }
  // }, [clickedImage]);

  // useEffect(() => {
  //   swapImages();
  // }, [swapImages]);
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <section className={styles.album}>
          <div className={styles.centerContainer}>
            <img
              className={styles.centerPhoto}
              src={`${process.env.PUBLIC_URL}/assets/${album[0].imgs[0].src}`}
              alt="img__main"
            />
            <div className={styles.detailCenter}>
              <Comments />
            </div>
          </div>
        </section>
        <section className={styles.allPhotos}>
          {album.map((photos) => (
            <AsidePhoto
              photos={photos}
              onClick={() => {
                // handleImageClick(photo.src);
              }}
            />
          ))}
        </section>
      </div>
    </>
  );
}

export default Album;
