import PropTypes from "prop-types";
import styles from "./AlbumThumb.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";

export default function AlbumThumb({ album }) {
  return (
    <>
      <div className={styles.album}>
        <div className={styles.wrapper}>
          <Link to={`${album.id}`} state={{ data: album }}>
            <img
              className={styles.image}
              src={`${process.env.PUBLIC_URL}/assets/${album.thumbnail}`}
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
    </>
  );
}

AlbumThumb.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string,
  likes: PropTypes.number.isRequired,
};
