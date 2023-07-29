import { useState, useEffect } from "react";
import AlbumThumb from "../../components/Thumbnail/AlbumThumb";
import styles from "./Gallery.module.css";
import Header from "../../components/Header";
import useFetch from "../../hooks/useFetch";

function Gallery() {
  const { data: albums, isLoading } = useFetch(
    "http://localhost:3002/galleries"
  );

  return (
    <div className={styles.gallery}>
      <Header />
      {isLoading ? (
        <h1>LOADING...</h1>
      ) : (
        <div className={styles.albums}>
          {albums.map((album) => (
            <AlbumThumb
              id={album.id}
              key={album.id}
              coverImg={album.thumbnail}
              // title={photo.title}
              // likes={photo.likes}
              // onClick={}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
