import AsidePhoto from "./AsidePhoto";
import { memo } from "react";

/**
 *
 * @param {photos, setSelectedPhoto} - Album.jsx로부터 가져온 앨범 내 사진 정보, 사진을 선택할 수 있는 useState 함수
 * @returns
 */
const AsidePhotos = ({ photos, setSelectedPhoto }) => {
  return (
    <div className="w-56 h-[calc(100vh-4.6rem)] fixed right-0  overflow-y-scroll">
      {photos.map((photo) => (
        <AsidePhoto
          key={photo.id}
          photo={photo}
          setSelectedPhoto={setSelectedPhoto}
        />
      ))}
    </div>
  );
};

export default memo(AsidePhotos);
