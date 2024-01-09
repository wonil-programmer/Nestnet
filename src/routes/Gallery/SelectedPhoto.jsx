import { useRef } from "react";
import { memo } from "react";
import { triggerFullscreen } from "../../utils/triggerFullScreen";

const SelectedPhoto = ({ selectedPhoto }) => {
  const selectedPhotoRef = useRef();
  // 각 브라우저에 대한 처리
  const triggerFull = () => {
    triggerFullscreen(selectedPhotoRef.current);
  };

  return (
    <>
      <img
        src={selectedPhoto}
        alt="thumbnail"
        ref={selectedPhotoRef}
        onDoubleClick={triggerFull}
      />
    </>
  );
};

export default memo(SelectedPhoto);
