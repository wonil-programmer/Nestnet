import Thumbnail from "./Thumbnail";
import Header from "../../components/Header";
import { useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { Flex } from "@chakra-ui/react";
import Masonry from "react-masonry-css";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../components/LoadingSpinner";

function Gallery() {
  const { ref: observeBtmRef, inView } = useInView();

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["albums"],
    queryFn: getMoreAlbums,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
    // select: (data) => ({
    //   pages: data?.pages.flatMap((page) => page.data),
    //   pageParams: data.pageParams,
    // }),
  });

  // const { setTarget } = useInfiniteScroll({
  //   hasNextPage,
  //   fetchNextPage,
  // });

  // Masonary 레이아웃 열 갯수 (반응형)
  const breakpointColumnsObj = {
    default: 3,
    1500: 3,
    800: 1,
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "error") return <h1>Error: {error.message}</h1>;

  return (
    <>
      <Header />
      <div>
        <div className="relative top-16 m-4">
          <Flex as={Masonry} breakpointCols={breakpointColumnsObj}>
            {data?.pages.map((albums) =>
              albums.map((album, idx) => {
                if (albums.length === idx + 1) {
                  return (
                    <Thumbnail
                      ref={observeBtmRef}
                      key={album.postId}
                      album={album}
                    />
                  );
                } else {
                  return <Thumbnail key={album.postId} album={album} />;
                }
              })
            )}
          </Flex>
          {isFetchingNextPage && (
            <div class="w-screen h-5 pt-2 pb-1 flex justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
        {/* 글 작성 버튼 */}
        <button className="fixed right-10 bottom-8">
          <Link to="/gallery/form">
            <AiFillPlusCircle className="w-12 h-12 text-home-primary" />
          </Link>
        </button>
      </div>
    </>
  );
}

const getMoreAlbums = async ({ pageParam }) => {
  // const albumsURL = `${process.env.REACT_APP_SERVER}/photo-post?page=${pageParam}`;
  // test: json-server
  const albumsURL = `${process.env.REACT_APP_SERVER}/photo-post?_page=${pageParam}`;

  return await axios.get(albumsURL).then((res) => res.data);
};

export default memo(Gallery);
