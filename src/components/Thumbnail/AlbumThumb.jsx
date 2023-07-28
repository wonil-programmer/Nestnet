import PropTypes from "prop-types";
import styles from "./AlbumThumb.module.css";
import { Link } from "react-router-dom";

export default function AlbumThumb({ id, coverImg, title, likes, onClick }) {
  return (
    <div className={styles.photo}>
      <img
        className={styles.image}
        src={`${process.env.PUBLIC_URL}/assets/${coverImg}`}
        alt={title}
      />
      <div className={styles.cover}>
        <Link to={`${id}`}>
          <button onClick={onClick}>자세히보기</button>
        </Link>
      </div>
    </div>
  );
}

AlbumThumb.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string,
  likes: PropTypes.number.isRequired,
};
