import { useRef } from "react";
import { memo } from "react";
import { triggerFullscreen } from "../../utils/triggerFullScreen";

const SelectedPhoto = ({ selectedPhoto, isCommentVisible }) => {
  const selectedPhotoRef = useRef();
  // 각 브라우저에 대한 처리
  const triggerFull = () => {
    triggerFullscreen(selectedPhotoRef.current);
  };

  return (
    <>
      <img
        className={`${isCommentVisible ? "rounded-t-2xl" : "rounded-2xl"}`}
        src={selectedPhoto}
        alt="thumbnail"
        ref={selectedPhotoRef}
        onDoubleClick={triggerFull}
      />
    </>
  );
};

export default memo(SelectedPhoto);
