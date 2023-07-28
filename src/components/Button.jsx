import { useState } from "react";
import styles from "./Button.module.css";
import callAlbum from "../api/Album/callAlbum";

function Button({ photos, setAside, setAllPhotos }) {
  const [visible, setVisible] = useState(true);
  const toggleAllPhotos = () => {
    setAside((aside) => !aside);
    setVisible(!visible);
    setAllPhotos(photos)
  };
  return (
    <>
      <button
        onClick={toggleAllPhotos}
        className={
          visible ? [styles.btn, styles.visible].join(" ") : styles.btn
        }
      >
        펼쳐보기
      </button>
    </>
  );
}

export default Button;
