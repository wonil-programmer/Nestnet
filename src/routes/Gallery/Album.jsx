import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./Album.module.css";
import Comments from "../../components/Comments/Comments";
import Header from "../../components/Header";
import useFetch from "../../hooks/useFetch";
import AsidePhotos from "./AsidePhotos";
import MainPhoto from "./MainPhoto";
import MainPhotoCover from "./MainPhotoCover";
import SideBar from "../../components/SideBar";

function Album() {
  // eslint-disable-next-line no-restricted-globals
  const location = useLocation();
  // albumData: 상위 AlbumThumb.jsx에서 Link로 넘겨준 props
  // => 갤러리 내 각 앨범에 대한 정보 (title, visits 등)
  const albumData = location.state.data;
  const { id } = useParams();
  const { data: photos, isLoading } = useFetch(
    `http://localhost:3002/album${id}`
  );
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setMainImage(photos[0].src);
    }
  }, [photos, isLoading]);

  return (
    <>
      <Header />
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.lView}>
            <SideBar className={styles.sideBar} />
          </div>
          <div className={styles.ctrView}>
            <div className={styles.visualContent}>
              <MainPhoto mainImage={mainImage} albumID={id} />
              {/* <MainPhotoCover albumData={albumData} /> */}
            </div>
            <div className={styles.description}>
              <Comments albumData={albumData} />
            </div>
          </div>
          <div className={styles.rView}>
            <AsidePhotos
              albumID={id}
              photos={photos}
              className={styles.asidePhotos}
              setMainImage={setMainImage}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Album;
