import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Album.module.css";
import Comments from "../../components/Comments/Comments";
import callAlbum from "../../api/Album/callAlbum";
import Photo from "../../components/Photo/Photo";

function Album() {
  const { id } = useParams();
  const [thumbnail, setThumbnail] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const [aside, setAside] = useState(false);
  const getPhoto = useCallback(async () => {
    const json = await (
      await fetch(
        `https://api.unsplash.com/photos/${id}?client_id=lArlrouEq1MxqzfJJyG0mFKIJ31zpffw6H0jUH88z8k`
      )
    ).json();
    setThumbnail(json.urls.small);
  }, [id]);
  const toggleAllPhotos = () => {
    setAside(!aside);
    callAlbum()
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        setAllPhotos(body);
      });
  };
  useEffect(() => {
    getPhoto();
  }, [getPhoto]);

  return (
    <>
      <button onClick={toggleAllPhotos} className={styles.btn__unfold}>
        dfadfs
      </button>
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
              src={thumbnail}
              alt="img__main"
            />
            <div className={styles.detail}>
              <Comments />
            </div>
          </div>
        </section>
        {aside && (
          <div className={styles.allPhotos}>
            {allPhotos.map((photo) => (
              <Photo
                id={photo.id}
                key={photo.id}
                coverImg={photo.urls.small_s3}
                title={photo.alt_description}
                likes={photo.likes}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Album;
