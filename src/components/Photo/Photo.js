import PropTypes from "prop-types";
import styles from "./photo.module.css";

function Photo({ id, coverImg, title, likes }) {
  return (
    <div className={styles.photo}>
      <img className={styles.thumbnail} src={coverImg} alt={title} />
      <div className={styles.link}>
        <h2>{title}</h2>
        <p>{likes}</p>
      </div>
    </div>
  );
}

Photo.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};
export default Photo;
