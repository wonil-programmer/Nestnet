import { useState, useEffect } from "react";
import Photo from "../../components/Photo/Photo";
import styles from "./Gallery.module.css";
import Header from "../../components/Header";
import callAlbum from "../../api/Album/callAlbum";

function Gallery() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);

  const getPhotos = async () => {
    callAlbum()
      .then((res) => res.json())
      .then((body) => {
        setPhotos(body);
      });
    setLoading(false);
  };

  useEffect(() => {
    getPhotos();
  }, []);
  return (
    <div className={styles.gallery}>
      <Header />
      {loading ? (
        <h1>LOADING...</h1>
      ) : (
        <div className={styles.photos}>
          {photos.map((photo) => (
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
  );
}

export default Gallery;
