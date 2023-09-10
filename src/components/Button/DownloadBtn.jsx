import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import styles from "./DownloadBtn.module.css";
import { MainPhotoContext } from "../../context/MainPhotoContext";
import { useContext } from "react";

export default function DownloadBtn() {
  const { mainImage } = useContext(MainPhotoContext);

  const downldPath = `${process.env.PUBLIC_URL}/assets/${mainImage}`;

  return (
    <a download={mainImage} href={downldPath}>
      <div className={styles.btnDownld}>
        <FontAwesomeIcon className={styles.iconDownld} icon={faDownload} />
      </div>
    </a>
  );
}
