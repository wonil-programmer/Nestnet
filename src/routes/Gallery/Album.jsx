import AlbumDescription from "./AlbumDescription";
import Header from "../../components/Header";
import AsidePhotos from "./AsidePhotos";
import PhotoSelected from "./PhotoSelected";
import SideBar from "../../components/SideBar";
import { useState, useEffect, useContext } from "react";
import { MainPhotoContext } from "../../context/MainPhotoContext";
import { useParams, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import axios from "axios";

function Album() {
  console.log("앨범");
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

  // 실제 경로id
  // const { postId } = useParams();
  const { id } = useParams();
  const url = `http://localhost:3002/album${id}`;

  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setMainImage } = useContext(MainPhotoContext);

  // 앨범 api 호출
  useEffect(() => {
    // 실제 경로
    // `~/${postId}`
    const fetchPhotos = () => {
      axios?.get(url)?.then((res) => {
        setPhotos(res.data);
        setIsLoading(false);
        setMainImage(res.data[0].src);
      });
    };
    fetchPhotos();
  }, [url]);

  // useEffect(() => {
  //   setMainImage(!isLoading && photos ? photos[0].src : null);
  // }, [photos, isLoading]);
  // @@@@@@@@@@@@실제 로직에 추가
  // useEffect(() => {
  //   setMainImage(albumData.thumb);

  // }, [])

  const scrollToDescription = () => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  const scrollToMainPhoto = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      {isLoading || !photos ? (
        <h1>Loading</h1>
      ) : (
        <div className="wrapper relative top-16 w-full h-full flex bg-home-background">
          <SideBar className="fixed top-48" />
          <div className="ctrView flex flex-col m-auto">
            <div className="relative -top-8 w-album-visWth h-screen  flex flex-col justify-center">
              <PhotoSelected />
              {/* AlbumDescription으로 이동하는 화살표 버튼 */}
              <div className="absolute bottom-8 left-2/4 -translate-x-2/4">
                <FiChevronDown
                  className="text-4xl text-stone-500 cursor-pointer hover:animate-[wiggle_1s_ease-in-out_infinite] hover:text-stone-600"
                  onClick={scrollToDescription}
                />
              </div>
            </div>
            <div className="h-screen pt-32">
              {/* 개별 앨범에 대한 정보(조회수, 좋아요 수)를 인자로 넘김 */}
              <AlbumDescription albumData={albumData} />
              {/* AlbumMainPhoto으로 이동하는 화살표 버튼 */}
              <div className="absolute bottom-2 left-2/4 -translate-x-2/4">
                <FiChevronUp
                  className="text-4xl text-stone-500 cursor-pointer hover:animate-[wiggle_1s_ease-in-out_infinite] hover:text-stone-600"
                  onClick={scrollToMainPhoto}
                />
              </div>
            </div>
          </div>
          <AsidePhotos
            // 실제 photos props
            // photos={album.file-data}
            photos={photos}
            // 메인이미지를 변경할 수 있게 함
          />
        </div>
      )}
    </>
  );
}

export default Album;
