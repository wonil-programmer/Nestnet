import { useRef } from "react";
import { memo } from "react";
import { MdZoomOutMap } from "react-icons/md";

const SelectedPhoto = ({ selectedPhoto }) => {
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
        className={
          "relative max-w-max h-max m-auto my-6 text-center rounded-xl overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
        }
      >
        <img src={selectedPhoto} alt="thumbnail" ref={selectedPhotoRef} />
        <button onClick={triggerFull} className={"absolute right-8 bottom-8"}>
          <MdZoomOutMap
            className={
              "text-2xl text-stone-500 cursor-pointer hover:scale-105 hover:text-stone-600 duration-200 ease-in-out"
            }
          />
        </button>
      </div>
    </>
  );
};

export default memo(SelectedPhoto);
