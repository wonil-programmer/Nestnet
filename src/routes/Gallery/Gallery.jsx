import { useState, useEffect } from "react";
import AlbumThumb from "../../components/Thumbnail/AlbumThumb";
import styles from "./Gallery.module.css";
import Header from "../../components/Header";
import useFetch from "../../hooks/useFetch";

function Gallery() {
  const albums = useFetch("http://localhost:3001/galleries");
  console.log(albums);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [loading]);
  return (
    <div className={styles.gallery}>
      <Header />
      {loading ? (
        <h1>LOADING...</h1>
      ) : (
        <div className={styles.albums}>
          {albums.map((album) => (
            <AlbumThumb
              id={album.id}
              key={album.id}
              coverImg={album.imgs[0].src}
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
