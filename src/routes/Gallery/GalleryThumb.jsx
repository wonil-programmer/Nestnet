import PropTypes from "prop-types";
import styles from "./GalleryThumb.module.css";
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
    <div className={styles.album}>
      <div className={styles.wrapper}>
        {/* @@@@@@@@@@@@실제 로직에 추가 */}
        {/* <Link to={`${album.postId}` state={{ data: album, mainPhotoPath: thumbPath}} */}
        <Link to={`${album.id}`} state={{ albumData: album }}>
          <img
            className={styles.image}
            src={`${process.env.PUBLIC_URL}/assets/${album.thumbnail}`}
            // 실제 경로
            // src={thumbPath}
            alt={"album thumbnail"}
          />
          <div className={styles.cover}>
            <div className={styles.title}>{album.title}</div>
            <div className={styles.metadata}>
              <div className={styles.visits}>
                <FontAwesomeIcon icon={faEye} /> <span>{album.visits}</span>
              </div>
              <div className={styles.likes}>
                <FontAwesomeIcon icon={faHeart} /> <span>{album.likes}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

// GalleryThumb.propTypes = {
//   coverImg: PropTypes.string.isRequired,
//   title: PropTypes.string,
//   likes: PropTypes.number.isRequired,
// };
