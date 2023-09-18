import { MainPhotoContext } from "../../context/MainPhotoContext";
import { useContext } from "react";

const PhotoClicked = () => {
  const { mainImage } = useContext(MainPhotoContext);
  const imgPath = `${process.env.PUBLIC_URL}/assets/${mainImage}`;

  return (
    <>
      {
        <div
          className="w-5/6 h-5/6 rounded-3xl m-auto my-6  bg-center bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url(${imgPath})`,
          }}
        ></div>
      }
    </>
  );
};

export default PhotoClicked;
