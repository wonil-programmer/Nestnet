import styles from "./AsidePhotos.module.css";
import AsidePhoto from "./AsidePhoto";
import { useState, useEffect } from "react";

export default function AsidePhotos({ photos, setMainImage }) {
  const [clickedImage, setClickedImage] = useState("");

  const handleImageClick = (imagePath) => {
    setClickedImage(imagePath);
  };

  useEffect(() => {
    if (clickedImage) {
      setMainImage(clickedImage);
    }
  }, [clickedImage, setMainImage]);

  return (
    <div className={styles.asidePhotos}>
      {photos.map((photo) => (
        <AsidePhoto
          photo={photo}
          onClick={() => {
            handleImageClick(photo.src);
          }}
        />
      ))}
    </div>
  );
}
