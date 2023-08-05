import styles from "./AsidePhoto.module.css";

export default function AsidePhoto({ albumID, photo, onClick }) {
  // const [isLiked, setIsLiked] = useState(photo.isLiked);
  // const toggleLike = () => {
  //   fetch(`http://localhost:3001/album${albumID}/${photo.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       ...photo,
  //       isLiked: !isLiked,
  //     }),
  //   }).then((res) => {
  //     if (res.ok) {
  //       console.log("clicked");
  //       setIsLiked(!isLiked);
  //     }
  //   });
  // };
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.image}
        key={photo.id}
        src={`${process.env.PUBLIC_URL}/assets/${photo.src}`}
        alt={photo.alt}
      />
      <div className={styles.cover}>
        <button onClick={onClick}>돋보기</button>
      </div>
    </div>
  );
}
