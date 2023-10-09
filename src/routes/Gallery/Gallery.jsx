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
const limit = 10;

function Gallery() {
  console.log("갤러리");
  const [albums, setAlbums] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  const initRequestUrl = `http://localhost:3001/photo-post?_page=1&_limit=${limit}`;
  // 초기 화면 렌더링
  // 실제 url
  // const url = "http://172.20.10.8:8080/photo-post";
  // 테스트 url
  const url = "http://localhost:3001/photo-post";

  const offset = page * 10;
  // 실제 url
  // const queryParams = `?offset=${offset}&limit=${limit}`;
  // 테스트 url
  let queryParams = `?_page=${page}&_limit=${limit}`;
  let requestUrl = url + queryParams;

  // 스크롤이 끝지점에 다다르면 다음 페이지 호출
  // const fetchNextAlbums =
  //   ({ setAlbums, setHasMore }) =>
  //   async () => {
  //     setPage((page) => page + 1);
  //     console.log(page);
  //     await axios?.get(requestUrl)?.then((res) => {
  //       console.log(res);
  //       // setAlbums((prevAlbums) => prevAlbums.concat(nextAlbums));
  //     });
  //     // api 호출시 page 당 데이터 개수: 10개
  //     nextAlbums.length < ALBUM_NUMS_PER_PAGE
  //       ? setHasMore(false)
  //       : setHasMore(true);
  //   };
  // 테스트 : 스크롤이 끝지점에 다다르면 다음 페이지 호출
  const fetchNextAlbums =
    ({ setAlbums, setHasMore }) =>
    async () => {
      setPage((page) => page + 1);
      await axios?.get(requestUrl)?.then((res) => {
        setAlbums((prevAlbums) => prevAlbums.concat(res.data));
        // api 호출시 page 당 데이터 개수: 10개
        res.data.length < ALBUM_NUMS_PER_PAGE
          ? setHasMore(false)
          : setHasMore(true);
      });
    };

  // 초기 갤러리 불러오기
  // useEffect(() => {
  //   axios?.get(requestUrl)?.then((res) => {
  //     setAlbums(res.data.response);
  //     setIsLoading(false);
  //   });
  // }, [requestUrl]);
  // 테스트 : 초기 갤러리 불러오기
  useEffect(() => {
    axios?.get(initRequestUrl)?.then((res) => {
      setAlbums(res.data);
      setIsLoading(false);
    });
  }, [initRequestUrl]);

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
