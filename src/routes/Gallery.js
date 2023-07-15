import { useState, useEffect } from "react";
import Photo from "../components/Photo";
import styles from "../gallery.module.css";

function Gallery() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const Access_Key = "lArlrouEq1MxqzfJJyG0mFKIJ31zpffw6H0jUH88z8k";
  const url = `https://api.unsplash.com/photos?page=3&client_id=${Access_Key}`;
  const getPhotos = async () => {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    setPhotos(json);
    setLoading(false);
  };
  useEffect(() => {
    getPhotos();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>LOADING...</h1>
      ) : (
        <div className="galleryView">
          {photos.map((photo) => (
            <Photo
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
