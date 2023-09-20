import { MainPhotoContext } from "../../context/MainPhotoContext";
import { useContext, useRef } from "react";
import { MdZoomOutMap } from "react-icons/md";

const PhotoClicked = () => {
  const { mainImage } = useContext(MainPhotoContext);
  const imgPath = `${process.env.PUBLIC_URL}/assets/${mainImage}`;
  const clickedPhotoRef = useRef();
  // 각 브라우저에 대한 처리
  const triggerFull = () => {
    if (clickedPhotoRef.current.requestFullscreen) {
      clickedPhotoRef.current.requestFullscreen();
    }
    if (clickedPhotoRef.current.webkitRequestFullscreen) {
      clickedPhotoRef.current.webkitRequestFullscreen();
    }
    if (clickedPhotoRef.current.mozRequestFullScreen) {
      clickedPhotoRef.current.mozRequestFullScreen();
    }
    if (clickedPhotoRef.current.msRequestFullscreen) {
      clickedPhotoRef.current.msRequestFullscreen();
    }
  };

  return (
    <>
      <div
        ref={clickedPhotoRef}
        className={"w-5/6 h-5/6 m-auto my-6  bg-center bg-contain bg-no-repeat"}
        style={{
          backgroundImage: `url(${imgPath})`,
        }}
      ></div>
      <button onClick={triggerFull} className={"absolute right-28 bottom-10"}>
        <MdZoomOutMap
          className={
            "text-2xl text-stone-500 cursor-pointer hover:scale-105 hover:text-stone-600 duration-200 ease-in-out"
          }
        />
      </button>
    </>
  );
};

export default PhotoClicked;
