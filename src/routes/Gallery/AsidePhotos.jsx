import AsidePhoto from "./AsidePhoto";
import { memo } from "react";

const AsidePhotos = ({ photos }) => {
  return (
    <div className="w-56 h-screen fixed right-0.5 pb-16 overflow-y-scroll">
      {photos.map((photo) => (
        <AsidePhoto key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default memo(AsidePhotos);
