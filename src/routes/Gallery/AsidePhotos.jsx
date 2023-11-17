import AsidePhoto from "./AsidePhoto";
import { memo } from "react";

/**
 *
 * @param {photos} - Album.jsx로부터 가져온 앨범 내 사진 정보
 * @returns
 */
const AsidePhotos = ({ photos }) => {
  return (
    <div className="w-56 h-[calc(100vh-4.6rem)] fixed right-0  overflow-y-scroll">
      {photos.map((photo) => (
        <AsidePhoto key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default memo(AsidePhotos);
