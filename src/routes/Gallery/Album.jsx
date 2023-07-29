import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Album.module.css";
import Comments from "../../components/Comments/Comments";
import Header from "../../components/Header";
import useFetch from "../../hooks/useFetch";
import AsidePhotos from "./AsidePhotos";

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
          <div>
            <div className={styles.mainContainer}>
              <img
                className={styles.mainPhoto}
                src={`${process.env.PUBLIC_URL}/assets/${mainImage}`}
                alt="img__main"
              />
              <div className={styles.metadata}>
                <Comments />
              </div>
            </div>
          </div>
          <div>
            <AsidePhotos
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
