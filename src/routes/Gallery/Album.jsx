import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Album.module.css";
import Comments from "../../components/Comments/Comments";
import Photo from "../../components/Photo/Photo";
import Button from "../../components/Button";
import Header from "../../components/Header";

function Album() {
  const { id } = useParams();
  const [allPhotos, setAllPhotos] = useState([]);
  const [aside, setAside] = useState(false);

  const [mainImage, setMainImage] = useState("");
  const [clickedImage, setClickedImage] = useState("");

  const getPhoto = useCallback(async () => {
    const json = await (
      await fetch(
        `https://api.unsplash.com/photos/${id}?client_id=lArlrouEq1MxqzfJJyG0mFKIJ31zpffw6H0jUH88z8k`
      )
    ).json();
    setMainImage(json.urls.small_s3);
  }, [id]);

  const handleImageClick = (imagePath) => {
    setClickedImage(imagePath);
  };
  const swapImages = useCallback(() => {
    if (clickedImage) {
      setMainImage(clickedImage);
    }
  }, [clickedImage]);

  useEffect(() => {
    getPhoto();
  }, [getPhoto]);

  useEffect(() => {
    swapImages();
  }, [swapImages]);
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <section className={styles.album}>
          <div
            className={
              aside
                ? [styles.leftContainer, styles.centerContainer].join(" ")
                : styles.centerContainer
            }
          >
            <img
              className={aside ? styles.leftPhoto : styles.centerPhoto}
              src={mainImage}
              alt="img__main"
            />
            <div className={aside ? styles.detailLeft : styles.detailCenter}>
              <Comments />
            </div>
          </div>
        </section>
        {aside && (
          <section className={styles.allPhotos}>
            {allPhotos.map((photo) => (
              <Photo
                id={photo.id}
                key={photo.id}
                coverImg={photo.urls.small}
                title={photo.alt_description}
                likes={photo.likes}
                onClick={() => {
                  handleImageClick(photo.urls.small_s3);
                }}
              />
            ))}
          </section>
        )}
        <Button setAside={setAside} setAllPhotos={setAllPhotos} />
      </div>
    </>
  );
}

export default Album;
