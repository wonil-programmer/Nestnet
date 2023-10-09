import { memo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";

// GalleryThumb : 갤러리 페이지의 각각의 앨범 썸네일
const Thumbnail = ({ album }) => {
  // const imageRootPath = "http://172.20.10.8:8080/image";
  let saveFilePath = album.saveFilePath;
  let saveFileName = album.saveFileName;
  let thumbPath = saveFilePath + "/" + saveFileName;

  return (
    <div className="pt-0 px-2 pb-6">
      <Link
        to={`${album.postId}`}
        state={{ albumData: album.data, selectedPhotoPath: thumbPath }}
      >
        <div className="relative flex-col rounded-2xl overflow-hidden shadow-md shadow-pink-200 duration-300 hover:cursor-zoom-in hover:-translate-y-2 hover:ease-in-out hover:shadow-pink-300 hover:shadow-lg">
          <img
            className="w-full max-w-full brightness-95"
            // src={thumbPath}
            // test src
            src={`${process.env.PUBLIC_URL}/${thumbPath}`}
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
