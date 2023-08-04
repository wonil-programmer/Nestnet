import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Album.module.css";
import Comments from "../../components/Comments/Comments";
import Header from "../../components/Header";
import useFetch from "../../hooks/useFetch";
import AsidePhotos from "./AsidePhotos";
import MainPhoto from "./MainPhoto";

function Album() {
  const { id } = useParams();
  const { data: photos, isLoading } = useFetch(
    `http://localhost:3001/album${id}`
  );
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setMainImage(photos[0].src);
    }
  }, [photos, isLoading]);

  return (
    <>
      <Header />
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.lView}></div>
          <div className={styles.ctrView}>
            <div className={styles.mainContainer}>
              <div className={styles.visualContent}>
                <MainPhoto mainImage={mainImage} />
              </div>
              <div className={styles.description}>
                <Comments />
              </div>
            </div>
          </div>
          <div className={styles.rView}>
            <AsidePhotos
              albumID={id}
              photos={photos}
              className={styles.asidelPhotos}
              setMainImage={setMainImage}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Album;
