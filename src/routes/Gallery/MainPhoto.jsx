import styles from "./MainPhoto.module.css";

export default function MainPhoto({ mainImage, albumID }) {
  //   const [isLiked, setIsLiked] = useState(photo.isLiked);

  const toggleLike = () => {
    fetch(`http://localhost:3001/album${albumID}`);
  };
  return (
    <>
      <img
        className={styles.mainPhoto}
        src={`${process.env.PUBLIC_URL}/assets/${mainImage}`}
        alt="img__main"
      />
    </>
  );
}
