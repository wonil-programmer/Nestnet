import { memo, forwardRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param {album} album - Gallery.jsx로부터 넘어온 하나의 앨범에 대한 객체
 * @returns
 */
const Thumbnail = forwardRef(({ album }, ref) => {
  const imageRootPath = `${process.env.REACT_APP_SERVER}/image`;
  let saveFilePath = album.saveFilePath;
  let saveFileName = album.saveFileName;
  // let thumbnailPath = imageRootPath + "/" + saveFilePath + "/" + saveFileName;
  let thumbnailPath = saveFilePath + "/" + saveFileName;

  return (
    <>
      <div
        className="pt-0 px-2 pb-6 min-w-[22.65rem] max-w-[22.65rem]"
        ref={ref}
      >
        <Link
          to={`${album.postId}`}
          state={{
            selectedPhotoPath: thumbnailPath,
            title: album.title,
            viewCount: album.viewCount,
            likeCount: album.likeCount,
          }}
        >
          <div className="relative flex-col rounded-2xl overflow-hidden duration-300 hover:cursor-zoom-in hover:-translate-y-2 hover:ease-in-out shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
            <img
              className="w-full max-w-full brightness-95"
              // src={thumbnailPath}
              src={`/${thumbnailPath}`}
              alt={"album thumbnail"}
            />
            <div className="title mt-3 mb-0 text-slate-800 text-2xl text-center font-bold">
              {album.title}
            </div>
            <div className="metadata flex justify-center my-4 text-[#666666]">
              <div className="visits mr-2">
                <FontAwesomeIcon icon={faEye} /> <span>{album.viewCount}</span>
              </div>
              <div className="likes ml-2">
                <FontAwesomeIcon icon={faHeart} />{" "}
                <span>{album.likeCount}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
});

export default memo(Thumbnail);
