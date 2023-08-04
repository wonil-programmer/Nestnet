import PropTypes from "prop-types";
import styles from "./AlbumThumb.module.css";
import { Link } from "react-router-dom";

export default function AlbumThumb({ album }) {
  return (
    <>
      <div className={styles.album}>
        <div className={styles.wrapper}>
          <Link to={`${album.id}`}>
            <img
              className={styles.image}
              src={`${process.env.PUBLIC_URL}/assets/${album.thumbnail}`}
              alt={"album thumbnail"}
            />
            <div className={styles.cover}></div>
          </Link>
          <div className={styles.title}>{album.title}</div>
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
