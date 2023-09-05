import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import AlbumDescription from "./AlbumDescription";
import Header from "../../components/Header";
import useFetch from "../../hooks/useFetch";
import AsidePhotos from "./AsidePhotos";
import AlbumMainPhoto from "./AlbumMainPhoto";
import SideBar from "../../components/SideBar";

function Album() {
  // eslint-disable-next-line no-restricted-globals
  const location = useLocation();
  // albumData: 상위 GalleryThumb.jsx에서 Link로 넘겨준 props
  // => 갤러리 내 각 앨범에 대한 정보 (title, visits 등)
  const albumData = location.state.albumData;

  // @@@@@@@@@@@@실제 로직에 추가
  // mainPhotoPath: 상위 GalleryThumb.jsx에서 Link로 넘겨준 props
  // const mainPhotoPath = location.state.mainPhotoPath
  // @@@@@@@@@@@@실제 로직에 추가
  // 실제 메인이미지 경로
  // setMainImage(mainPhotoPath);

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
    }
  }, [photos, isLoading]);
  // @@@@@@@@@@@@실제 로직에 추가
  // useEffect(() => {
  //   setMainImage(albumData.thumb);

  // }, [])
  return (
    <>
      <Header />
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div class="wrapper relative top-16 w-full h-full flex bg-home-background">
          <SideBar class="fixed top-48" />
          <div class="ctrView flex-col m-auto">
            <div class="w-album-visWth h-screen m-auto">
              <AlbumMainPhoto mainImage={mainImage} />
            </div>
            <div class="h-screen pt-32">
              <div class="w-album-desWth m-auto mb-4 rounded-2xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] ">
                {/* 개별 앨범에 대한 정보(조회수, 좋아요 수)를 인자로 넘김 */}
                <AlbumDescription albumData={albumData} mainImage={mainImage} />
              </div>
            </div>
          </div>
          <AsidePhotos
            albumID={id}
            // 실제 photos props
            // photos={album.file-data}
            photos={photos}
            // 메인이미지를 변경할 수 있게 함
            setMainImage={setMainImage}
          />
        </div>
      )}
    </>
  );
}

export default Album;
