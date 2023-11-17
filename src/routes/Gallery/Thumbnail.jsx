import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param {album} album - Gallery.jsx로부터 넘어온 하나의 앨범에 대한 객체
 * @returns
 */
const Thumbnail = ({ album }) => {
  const imageRootPath = `${process.env.REACT_APP_SERVER}/image`;
  let saveFilePath = album.saveFilePath;
  let saveFileName = album.saveFileName;
  let thumbnailPath = imageRootPath + "/" + saveFilePath + "/" + saveFileName;

  return (
    <div className="pt-0 px-2 pb-6">
      <Link
        to={`${album.postId}`}
        state={{
          selectedPhotoPath: thumbnailPath,
          title: album.title,
          viewCount: album.viewCount,
          likeCount: album.likeCount,
        }}
      >
        <div className="relative flex-col rounded-2xl overflow-hidden shadow-md shadow-pink-200 duration-300 hover:cursor-zoom-in hover:-translate-y-2 hover:ease-in-out hover:shadow-pink-300 hover:shadow-lg">
          <img
            className="w-full max-w-full brightness-95"
            src={thumbnailPath}
            alt={"album thumbnail"}
          />
          <div className="title m-4 mb-0 text-slate-800 text-2xl text-center font-bold">
            {album.title}
          </div>
          <div className="metadata flex justify-center my-4">
            <div className="visits mr-2">
              <FontAwesomeIcon icon={faEye} /> <span>{album.viewCount}</span>
            </div>
            <div className="likes ml-2">
              <FontAwesomeIcon icon={faHeart} /> <span>{album.likeCount}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default memo(Thumbnail);
