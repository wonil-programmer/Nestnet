import GalleryThumb from "./GalleryThumb";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useState } from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchAlbums from "./fetchAlbums";
import { Flex } from "@chakra-ui/react";

function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  // 스크롤이 끝지점에 다다르면 다음 페이지 호출
  const fetchNextAlbums =
    ({ page, setAlbums, setPage, setHasMore }) =>
    async () => {
      const nextAlbums = await fetchAlbums({
        setPage,
        setHasMore,
        page,
      });
      setAlbums((prev) => prev.concat(nextAlbums));
    };

  // 초기 갤러리 화면 불러오기
  const initGallery = async () => {
    const initAlbums = await fetchAlbums({ setPage, setHasMore });
    setAlbums(initAlbums);
  };

  // 초기 화면 렌더링
  useEffect(() => {
    initGallery();
  }, []);

  // Masonary 레이아웃 열 갯수 (반응형)
  const breakpointColumnsObj = {
    default: 3,
    1500: 2,
    800: 1,
  };

  return (
    <div class="relative top-20">
      <Header />
      <div class="m-4">
        <InfiniteScroll
          dataLength={albums.length}
          hasMore={hasMore}
          next={fetchNextAlbums({
            page,
            setAlbums,
            setPage,
            setHasMore,
          })}
        >
          <Flex as={Masonry} breakpointCols={breakpointColumnsObj}>
            {albums &&
              albums.map((album) => (
                <GalleryThumb key={album.id} id={album.id} album={album} />
                // <GalleryThumb key={album.postId} id={album.postId} album={album} />
              ))}
          </Flex>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Gallery;
