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
    <div className="w-56 h-screen fixed right-0.5 pb-16 overflow-y-scroll">
      {photos.map((photo) => (
        <AsidePhoto
          photo={photo}
          onClick={() => {
            // 실제 이벤트클릭 함수
            // handleImageClick(photo.saveFileName);
            handleImageClick(photo.src);
          }}
        />
      ))}
    </div>
  );
}
