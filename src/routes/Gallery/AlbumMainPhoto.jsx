import { MainPhotoContext } from "../../context/MainPhotoContext";
import { useContext } from "react";

export default function MainPhoto() {
  const { mainImage } = useContext(MainPhotoContext);
  const imgPath = `${process.env.PUBLIC_URL}/assets/${mainImage}`;

  return (
    <>
      {
        <div
          className="w-4/5 h-5/6 rounded-3xl m-auto my-6  bg-center bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url(${imgPath})`,
          }}
        ></div>
      }
    </>
  );
}
