import { useState } from "react";
import { redirect, useParams } from "react-router-dom";
import styles from "./Modal.module.css";

function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

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
            <div></div>
            <p>2023.3.10</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Modal;
