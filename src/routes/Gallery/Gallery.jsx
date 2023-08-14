import GalleryThumb from "./GalleryThumb";
import styles from "./Gallery.module.css";
import Header from "../../components/Header";
import { useEffect } from "react";
import { useState } from "react";

function Gallery() {
  const [albums, setAlbums] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 5;
  // const { data: albums, isLoading } = useFetch(
  //   "http://localhost:3001/galleries",
  //   offset,
  //   limit
  // );
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `http://localhost:3001/galleries?_start=${offset}&_limit=${limit}`
        );
        const data = await res.json();
        setIsLoading(false);

        setAlbums((prev) => [...prev, ...data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [offset]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setOffset(offset + limit);
      }
    };
    window.addEventListener("scroll", handleScroll);
    console.log("로딩");
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, isLoading]);
  return (
    <div className={styles.gallery}>
      <Header />
      {isLoading ? (
        <h1>LOADING...</h1>
      ) : (
        <>
          <section className={styles.albums}>
            {albums &&
              albums.map((album) => (
                <GalleryThumb key={album.id} id={album.id} album={album} />
                // <GalleryThumb key={album.postId} id={album.postId} album={album} />
              ))}
          </section>
        </>
      )}
    </div>
  );
}

export default Gallery;
