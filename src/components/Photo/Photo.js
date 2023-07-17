import PropTypes from "prop-types";
import styles from "./photo.module.css";
import { Link } from "react-router-dom";

function Photo({ id, coverImg, title, likes }) {
  return (
    <div className={styles.photo}>
      <img className={styles.thumbnail} src={coverImg} alt={title} />
      <div className={styles.link}>
        <h2>
          <Link to={`${id}`}>aaa</Link>
        </h2>
        <h2>{title}</h2>
        <p>{likes}</p>
      </div>
    </div>
  );
}

Photo.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string,
  likes: PropTypes.number.isRequired,
};
export default Photo;
