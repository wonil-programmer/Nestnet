import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import styles from "./DownloadBtn.module.css";

export default function DownloadBtn({ mainImage }) {
  const downldPath = `${process.env.PUBLIC_URL}/assets/${mainImage}`;

  return (
    <a download={mainImage} href={downldPath} title="imageName">
      <div className={styles.btnDownld}>
        <FontAwesomeIcon className={styles.iconDownld} icon={faDownload} />
      </div>
    </a>
  );
}
