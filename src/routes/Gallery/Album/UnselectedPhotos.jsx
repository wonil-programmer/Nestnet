import { memo } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const UnselectedPhotos = ({ isAlbumLoading, photos, setSelectedPhoto }) => {
  const getPhotoPath = (photo) => {
    const photoRootPath = `${process.env.REACT_APP_SERVER}/image`;
    let filePath = photo.filePath;
    let saveFileName = photo.saveFileName;
    // let photoPath = photoRootPath + "/" + filePath + "/" + saveFileName;
    // test: json-server
    let photoPath = "/" + filePath + "/" + saveFileName;

    return photoPath;
  };

  const handleClickedPhoto = (photoPath) => {
    setSelectedPhoto(photoPath);
  };

  if (isAlbumLoading) return <div>Loading...</div>;

  return (
    <>
      {photos?.map((photo) => {
        const photoPath = getPhotoPath(photo);

        return (
          <div className="wrapper relative mb-4 rounded-md overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
            {/* boxshadow 사이트의 Warm테마 */}
            <img
              className="w-full"
              // key={photo.id}
              src={photoPath}
              alt={photo.originalFileName}
            />
            <div
              className="cover absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center text-center text-sm bg-black opacity-0 text-white duration-300 ease-in-out hover:opacity-75 hover:cursor-pointer"
              onClick={() => handleClickedPhoto(photoPath)}
            >
              <FaMagnifyingGlass className={"text-4xl"} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default memo(UnselectedPhotos);
