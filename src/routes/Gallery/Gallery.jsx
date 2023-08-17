import GalleryThumb from "./GalleryThumb";
import styles from "./Gallery.module.css";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useState } from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchAlbums from "./fetchAlbums";
import { Flex } from "@chakra-ui/react";

function Gallery() {
  const [albums, setAlbums] = useState([]);
  // const [offset, setOffset] = useState(0);
  // const limit = 5;
  const [isLoading, setIsLoading] = useState(false);

  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
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

  const initGallery = async () => {
    const initAlbums = await fetchAlbums({ setPage, setHasMore });
    console.log(initAlbums);
    setAlbums(initAlbums);
  };

  useEffect(() => {
    setIsLoading(true);
    initGallery();

    setIsLoading(false);
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1500: 2,
    800: 1,
  };

  return (
    <div className={styles.gallery}>
      <Header />
      {isLoading ? (
        <h1>LOADING...</h1>
      ) : (
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
      )}
    </div>
  );
}

export default Gallery;
