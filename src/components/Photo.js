import PropTypes from "prop-types";
import styles from "../css/photo.module.css";

function Photo({ id, coverImg, title, likes }) {
  return (
    <div className={styles}>
      <img className={styles.thumbnail} src={coverImg} alt={title} />
      <h2>{title}</h2>
      <p>{likes}</p>
    </div>
  );
}

Photo.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};
export default Photo;
