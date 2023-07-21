import { useState } from "react";
import styles from "./Button.module.css";
import callAlbum from "../api/Album/callAlbum";

function Button({ setAside, setAllPhotos }) {
  const [visible, setVisible] = useState(true);
  const toggleAllPhotos = () => {
    setAside((aside) => !aside);
    setVisible(!visible);
    callAlbum()
      .then((res) => res.json())
      .then((body) => {
        setAllPhotos(body);
      });
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
