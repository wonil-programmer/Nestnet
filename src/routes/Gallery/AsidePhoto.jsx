import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./AsidePhoto.module.css";

export default function AsidePhoto({ photo, onClick }) {
  // const filePath = filePath;
  // const saveFileName = saveFileName;
  // const photoPath = filePath + "/" + saveFileName;
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.image}
        key={photo.id}
        // 실제 photo src
        // src={photoPath}
        src={`${process.env.PUBLIC_URL}/assets/${photo.src}`}
        alt={photo.alt}
      />
      <div className={styles.cover} onClick={onClick}>
        <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
      </div>
    </div>
  );
}
