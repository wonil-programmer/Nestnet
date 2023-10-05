import Thumbnail from "./Thumbnail";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiFillPlusCircle } from "react-icons/ai";
import { Flex } from "@chakra-ui/react";
import axios from "axios";

const ALBUM_NUMS_PER_PAGE = 10;
function Gallery() {
  console.log("갤러리");
  const [albums, setAlbums] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 스크롤이 끝지점에 다다르면 다음 페이지 호출
  const fetchNextAlbums =
    ({ setAlbums, setHasMore }) =>
    async () => {
      setPage((page) => page + 1);
      console.log(page);
      const nextAlbums = await axios?.get(requestUrl);
      setAlbums((prevAlbums) => prevAlbums.concat(nextAlbums));
      // api 호출시 page 당 데이터 개수: 10개
      nextAlbums.length < ALBUM_NUMS_PER_PAGE
        ? setHasMore(false)
        : setHasMore(true);
    };

  // 초기 화면 렌더링
  // const url = "http://172.20.10.8:8080/photo-post";
  // test url
  const url = "http://localhost:3001/photo-post";

  const offset = page * 10;
  const limit = 10;
  const queryParams = `?offset=${offset}&limit=${limit}`;
  const requestUrl = url + queryParams;

  useEffect(() => {
    const getInitAlbums = async () => {
      const res = await axios?.get(requestUrl);
      setAlbums(res.data.response);
    };
    getInitAlbums();
    setIsLoading(false);
  }, [requestUrl]);

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
        <div>
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
                    <Thumbnail key={album.postId} album={album} />
                  ))}
              </Flex>
            </InfiniteScroll>
          </div>
          <button className="fixed right-10 bottom-8">
            <Link to="/gallery/form">
              <AiFillPlusCircle className="w-12 h-12 text-home-primary" />
            </Link>
          </button>
        </div>
      )}
    </>
  );
}

export default Gallery;
