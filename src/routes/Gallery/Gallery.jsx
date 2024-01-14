import Thumbnail from "./Thumbnail";
import { useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import { Flex } from "@chakra-ui/react";
import Masonry from "react-masonry-css";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../components/LoadingSpinner";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

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
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
  });

  // Masonary 레이아웃 열 갯수 (반응형)
  const breakpointColumnsObj = {
    default: 3,
    1500: 2,
    1000: 1,
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "error") return <h1>Error: {error.message}</h1>;

  return (
    <>
      <div className="flex justify-center pt-20">
        <Flex as={Masonry} breakpointCols={breakpointColumnsObj}>
          {status === "pending" &&
            Array.from(new Array(9)).map((_, index) => (
              <Box
                key={index}
                sx={{
                  margin: "1rem",
                  minWidth: "22.65rem",
                  maxWidth: "22.65rem",
                  height: "25rem",
                }}
              >
                <Skeleton variant="rounded" height="100%" />
              </Box>
            ))}
          {status !== "pending" &&
            data?.pages.map((albums) =>
              albums.map((album, idx) => {
                if (albums.length === idx + 1) {
                  return (
                    <Thumbnail
                      ref={observeBtmRef}
                      key={album.postId}
                      album={album}
                      isFetchingNextPage={isFetchingNextPage}
                    />
                  );
                } else {
                  return (
                    <Thumbnail
                      key={album.postId}
                      album={album}
                      isFetchingNextPage={isFetchingNextPage}
                    />
                  );
                }
              })
            )}
        </Flex>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
      {/* 글 작성 버튼 */}
      <button className="fixed right-10 bottom-8">
        <Link to="/gallery/form">
          <AiFillPlusCircle className="w-12 h-12 text-home-primary" />
        </Link>
      </button>
    </>
  );
}

const getMoreAlbums = async ({ pageParam }) => {
  // const albumsURL = `${process.env.REACT_APP_SERVER}/photo-post?page=${pageParam}`;
  // return await axios.get(albumsURL).then((res) => res.data.response.dtoList);

  // test: json-server
  const albumsURL = `${process.env.REACT_APP_SERVER}/photo-post?_page=${pageParam}`;
  return await axios.get(albumsURL).then((res) => res.data);
};

export default memo(Gallery);
