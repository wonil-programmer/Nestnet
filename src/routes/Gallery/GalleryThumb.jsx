import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";

// GalleryThumb : 갤러리 페이지의 각각의 앨범 썸네일
// album : 개별 앨범에 대한 정보(album.json)
export default function GalleryThumb({ album }) {
  // @@@@@@@@@@@@실제 로직에 추가
  // const saveFilePath = album.saveFilePath;
  // const saveFileName = album.saveFileName;
  // const thumbPath = saveFilePath + "/" + saveFileName;
  return (
    <div className="pt-0 px-2 pb-6">
      <Link to={`${album.id}`} state={{ albumData: album }}>
        <div className="relative flex-col rounded-2xl overflow-hidden shadow-md shadow-pink-200 duration-300 hover:cursor-zoom-in hover:-translate-y-2 hover:ease-in-out hover:shadow-pink-300 hover:shadow-lg">
          {/* @@@@@@@@@@@@실제 로직에 추가 */}
          {/* <Link to={`${album.postId}` state={{ data: album, mainPhotoPath: thumbPath}} */}
          <img
            className="w-full max-w-full brightness-95"
            src={`${process.env.PUBLIC_URL}/assets/${album.thumbnail}`}
            // 실제 경로
            // src={thumbPath}
            alt={"album thumbnail"}
          />
          <div className="title m-4 mb-0 text-slate-800 text-2xl text-center font-bold">
            {album.title}
          </div>
          <div className="metadata flex justify-center my-4">
            <div className="visits mr-2">
              <FontAwesomeIcon icon={faEye} /> <span>{album.visits}</span>
            </div>
            <div className="likes ml-2">
              <FontAwesomeIcon icon={faHeart} /> <span>{album.likes}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// GalleryThumb.propTypes = {
//   coverImg: PropTypes.string.isRequired,
//   title: PropTypes.string,
//   likes: PropTypes.number.isRequired,
// };
