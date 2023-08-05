import AlbumThumb from "./AlbumThumb";
import styles from "./Gallery.module.css";
import Header from "../../components/Header";
import useFetch from "../../hooks/useFetch";

function Gallery() {
  const { data: albums, isLoading } = useFetch(
    "http://localhost:3001/galleries"
  );

  return (
    <div className={styles.gallery}>
      <Header />
      {isLoading ? (
        <h1>LOADING...</h1>
      ) : (
        <>
          <section className={styles.albums}>
            {albums.map((album) => (
              <AlbumThumb key={album.id} id={album.id} album={album} />
            ))}
          </section>
        </>
      )}
    </div>
  );
}

export default Gallery;
