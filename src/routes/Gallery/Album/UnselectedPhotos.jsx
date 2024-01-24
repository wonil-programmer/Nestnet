import { memo } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import StringCombinator from "../../../utils/Combinator/StringCombinator";

/**
 * 선택되지 않은 사진들
 * @param {boolean, Object[], setState}
 * @returns
 */
const UnselectedPhotos = ({ isAlbumLoading, photos, setSelectedPhoto }) => {
  const handleClickedPhoto = (photoPath) => {
    setSelectedPhoto(photoPath);
  };

  // 로딩중 스켈레톤 효과 표시
  if (isAlbumLoading) {
    return (
      <div className="flex flex-col justify-between items-center w-full h-screen">
        {Array.from(new Array(4)).map((_, idx) => (
          <div
            key={idx}
            className="w-full h-[12rem] mb-4 bg-skeleton rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (!isAlbumLoading) {
    return (
      <>
        {photos?.map((photo) => (
          <div
            key={photo.id}
            className="wrapper relative mb-4 rounded-lg overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
          >
            <img
              className="w-full"
              src={StringCombinator.getImagePath(photo)}
              alt={photo.originalFileName}
            />
            <div
              className="cover absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center text-center text-sm bg-black opacity-0 text-white duration-300 ease-in-out hover:opacity-75 hover:cursor-pointer"
              onClick={() =>
                handleClickedPhoto(StringCombinator.getImagePath(photo))
              }
            >
              <FaMagnifyingGlass className={"text-4xl"} />
            </div>
          </div>
        ))}
      </>
    );
  }
};

export default memo(UnselectedPhotos);
