import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./Album.module.css";
import Comments from "../../components/Comments/Comments";
import Header from "../../components/Header";
import useFetch from "../../hooks/useFetch";
import AsidePhotos from "./AsidePhotos";
import MainPhoto from "./MainPhoto";
import SideBar from "../../components/SideBar";

function Album() {
  // eslint-disable-next-line no-restricted-globals
  const location = useLocation();
  // albumData: 상위 AlbumThumb.jsx에서 Link로 넘겨준 props
  // => 갤러리 내 각 앨범에 대한 정보 (title, visits 등)
  const albumData = location.state.data;
  const { id } = useParams();
  // 실제 경로id
  // const { postId } = useParams();

  const { data: photos, isLoading } = useFetch(
    // data: album
    // 실제 경로
    // `~/${postId}`
    `http://localhost:3002/album${id}`
  );
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setMainImage(photos[0].src);
      // 실제 메인이미지 경로
      // setMainImage(photos.file-data[0].filePath);
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
            <div className={styles.top}>
              <div className={styles.visualContent}>
                <MainPhoto mainImage={mainImage} albumID={id} />
              </div>
            </div>
            <div className={styles.description}>
              {/* 개별 앨범에 대한 정보(조회수, 좋아요 수)를 인자로 넘김 */}
              <Comments albumData={albumData} />
            </div>
          </div>
          <div className={styles.rView}>
            <AsidePhotos
              albumID={id}
              // 실제 photos props
              // photos={album.file-data}
              photos={photos}
              className={styles.asidePhotos}
              // 메인이미지를 변경할 수 있게 함
              setMainImage={setMainImage}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Album;
