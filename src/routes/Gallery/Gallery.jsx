import Thumbnail from "./Thumbnail";
import Header from "../../components/Header";
import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiFillPlusCircle } from "react-icons/ai";
import { Flex } from "@chakra-ui/react";
import axios from "axios";

const ALBUM_NUMS_PER_PAGE = 10;
const LIMIT = 10;

function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const offset = (page - 1) * LIMIT;
  let requestUrl = `${process.env.REACT_APP_SERVER}/photo-post?offset=${offset}&limit=${LIMIT}`;

  /**
   * 스크롤이 끝지점에 다다르면 다음 페이지 호출
   */
  const fetchNextAlbums =
    ({ setAlbums, setHasMore }) =>
    async () => {
      setPage((page) => page + 1);
      await axios?.get(requestUrl)?.then((res) => {
        let nextAlbums = [...res.data.response];
        setAlbums((prevAlbums) => prevAlbums.concat(nextAlbums));
        // 마지막 페이지 처리
        nextAlbums.length < ALBUM_NUMS_PER_PAGE
          ? setHasMore(false)
          : setHasMore(true);
      });
    };

  /**
   * 초기 마운트
   */
  useEffect(() => {
    axios?.get(requestUrl)?.then((res) => {
      setAlbums(res.data.response);
      setIsLoading(false);
    });
  }, [requestUrl]);

  // Masonary 레이아웃 열 갯수 (반응형)
  const breakpointColumnsObj = {
    default: 3,
    1500: 3,
    800: 1,
  };

  return (
    <>
      <Header />
      {isLoading || !albums ? (
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
                {albums.map((album) => (
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

export default memo(Gallery);
