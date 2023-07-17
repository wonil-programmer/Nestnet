import { useCallback, useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";
import styles from "./Modal.module.css";

function Modal() {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [photo, setPhoto] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };
  const getPhoto = useCallback(async () => {
    const json = await (
      await fetch(
        `https://api.unsplash.com/photos/${id}?client_id=lArlrouEq1MxqzfJJyG0mFKIJ31zpffw6H0jUH88z8k`
      )
    ).json();
    setPhoto(json.urls.small);
    console.log(id);
    console.log(json);
  }, [id]);
  useEffect(() => {
    getPhoto();
  }, [getPhoto]);
  return (
    <div className="modal__wrapper" onClick={() => redirect("/")}>
      <button onClick={toggleModal} className={styles.btn__open}>
        Open
      </button>

      {modal && (
        <div className={styles.modal}>
          <div className={styles.overlay}></div>
          <div className={styles.modal__content}>
            <h2>23학년도 1학기 개강총회</h2>
            <button className={styles.btn__close} onClick={toggleModal}>
              X
            </button>
            <div>
              <img src={photo} alt="img__detail" />
            </div>
            <p>2023.3.10</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Modal;
