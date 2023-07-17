import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Album.module.css";

function Album() {
  const { id } = useParams();
  const [photo, setPhoto] = useState([]);
  const getPhoto = useCallback(async () => {
    const json = await (
      await fetch(
        `https://api.unsplash.com/photos/${id}?client_id=lArlrouEq1MxqzfJJyG0mFKIJ31zpffw6H0jUH88z8k`
      )
    ).json();
    setPhoto(json.urls.small);
  }, [id]);
  useEffect(() => {
    getPhoto();
  }, [getPhoto]);

  return (
    <>
      <section className={styles.album}>
        <div className={styles.album__container}>
          <img className={styles.photo} src={photo} alt="img__main" />

          <div className={styles.detail}>
            <div className={styles.metadata}>
              <h1 className={styles.title}>23학년도 1학기 개강총회</h1>
              <div className={styles.divider}>
                <div className={styles.shadow__title}></div>
              </div>
              <div className={styles.comments__column}>
                <h3 className={styles.comments__list}>댓글</h3>
              </div>
            </div>
            <div className={styles.interaction}>
              <div className={styles.interaction__data}>
                <h3>댓글 16개</h3>
                <div>16 하트</div>
              </div>
              <div className={styles.comment}>
                <div className={styles.comment__profile}></div>
                <input
                  className={styles.comment__input}
                  type="text"
                  placeholder="댓글 추가"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div></div>
    </>
  );
}

export default Album;
