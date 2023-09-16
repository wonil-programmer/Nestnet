import Thumbnail from "./Thumbnail";
import Header from "../../components/Header";
import fetchAlbums from "./fetchAlbums";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Flex } from "@chakra-ui/react";

const ALBUM_NUMS_PER_PAGE = 10;

function Gallery() {
  console.log("갤러리");
  const [albums, setAlbums] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // 스크롤이 끝지점에 다다르면 다음 페이지 호출
  const fetchNextAlbums =
    ({ setAlbums, setHasMore }) =>
    async () => {
      const nextAlbums = await fetchAlbums({
        setPage,
        page,
      });
      setAlbums((prevAlbums) => prevAlbums.concat(nextAlbums));
      // api 호출시 page 당 데이터 개수: 10개
      nextAlbums.length < ALBUM_NUMS_PER_PAGE
        ? setHasMore(false)
        : setHasMore(true);
    };

  // 초기 갤러리 화면 불러오기
  const initGallery = async () => {
    const initAlbums = await fetchAlbums({ setPage, page });
    setAlbums(initAlbums);
    setIsLoading(false);
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
    <>
      <Header />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="relative top-16 m-4">
          <InfiniteScroll
            style={{ paddingTop: "1rem" }}
            dataLength={albums.length}
            hasMore={hasMore}
            next={fetchNextAlbums({
              setAlbums,
              setHasMore,
            })}
          >
            <Flex as={Masonry} breakpointCols={breakpointColumnsObj}>
              {albums &&
                albums.map((album) => (
                  <Thumbnail key={album.id} id={album.id} album={album} />
                  // <Thumbnail key={album.postId} id={album.postId} album={album} />
                ))}
            </Flex>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
}

export default Gallery;
