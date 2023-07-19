import PropTypes from "prop-types";
import styles from "./Photo.module.css";
import { Link } from "react-router-dom";

function Photo({ id, coverImg, title, likes, onClick }) {
  return (
    <div className={styles.photo} onClick={onClick}>
      <img className={styles.thumbnail} src={coverImg} alt={title} />
      <Link to={`${id}`}>
        {/* <div className={styles.link}>
          <h2>{title}</h2>
          <p>{likes}</p>
        </div> */}
      </Link>
    </div>
  );
}

Photo.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string,
  likes: PropTypes.number.isRequired,
};
export default Photo;
