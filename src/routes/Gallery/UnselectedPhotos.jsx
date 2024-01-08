import { memo, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const UnselectedPhotos = ({ photos, setSelectedPhoto }) => {
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
    console.log(photoPath);
    setSelectedPhoto(photoPath);
  };

  return (
    <>
      {photos?.map((photo) => {
        const photoPath = getPhotoPath(photo);

        return (
          <div className="wrapper relative my-4 rounded-md overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
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
