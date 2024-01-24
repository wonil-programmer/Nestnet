import { useRef } from "react";
import { memo } from "react";
import { triggerFullscreen } from "../../../utils/triggerFullScreen";

/**
 * 선택된 사진 (현재 보고 있는 사진)
 * @param {String} selectedPhoto
 * @returns
 */
const SelectedPhoto = ({ selectedPhoto }) => {
  const selectedPhotoRef = useRef();
  // 각 브라우저에 대한 이미지 풀스크린(확대) 처리
  const triggerFull = () => {
    triggerFullscreen(selectedPhotoRef.current);
  };

  return (
    <>
      {selectedPhoto ? (
        <img
          className="m-auto"
          src={selectedPhoto}
          alt="thumbnail"
          ref={selectedPhotoRef}
          onDoubleClick={triggerFull}
        />
      ) : (
        <>
          <div className="w-full h-full bg-skeleton animate-pulse"></div>
        </>
      )}
    </>
  );
};

export default memo(SelectedPhoto);
