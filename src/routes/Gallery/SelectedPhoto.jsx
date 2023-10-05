import { useRef } from "react";
import { MdZoomOutMap } from "react-icons/md";
import { useSelector } from "react-redux/es/hooks/useSelector";

const SelectedPhoto = () => {
  const selectedPhotoUrl = useSelector((state) => state.album.selectedPhoto);
  const selectedPhotoRef = useRef();
  // 각 브라우저에 대한 처리
  const triggerFull = () => {
    if (selectedPhotoRef.current.requestFullscreen) {
      selectedPhotoRef.current.requestFullscreen();
    }
    if (selectedPhotoRef.current.webkitRequestFullscreen) {
      selectedPhotoRef.current.webkitRequestFullscreen();
    }
    if (selectedPhotoRef.current.mozRequestFullScreen) {
      selectedPhotoRef.current.mozRequestFullScreen();
    }
    if (selectedPhotoRef.current.msRequestFullscreen) {
      selectedPhotoRef.current.msRequestFullscreen();
    }
  };

  return (
    <>
      <div
        ref={selectedPhotoRef}
        className={"w-5/6 h-5/6 m-auto my-6  bg-center bg-contain bg-no-repeat"}
        style={{
          backgroundImage: `url(${selectedPhotoUrl})`,
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

export default SelectedPhoto;
