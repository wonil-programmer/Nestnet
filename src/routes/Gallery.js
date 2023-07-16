import { useState, useEffect } from "react";
import Photo from "../components/Photo/Photo";
import styles from "../css/gallery.module.css";

console.log(styles);

const generateURL = (url, options) => {
  let _url = url + "?";

  Object.keys(options).forEach((key) => {
    const query = "&" + key + "=" + options[key];

    _url += query;
  });

  return _url;
};

const options = {
  per_page: 30,
  client_id: "lArlrouEq1MxqzfJJyG0mFKIJ31zpffw6H0jUH88z8k",
};

function Gallery() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);

  const url = generateURL("https://api.unsplash.com/photos", options);

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
        <div className={styles.photos}>
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
