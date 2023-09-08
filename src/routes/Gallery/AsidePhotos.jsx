import AsidePhoto from "./AsidePhoto";

export default function AsidePhotos({ photos, setMainImage }) {
  console.log("옆사진들");

  return (
    <div className="w-56 h-screen fixed right-0.5 pb-16 overflow-y-scroll">
      {photos.map((photo) => (
        <AsidePhoto
          key={photo.id}
          photo={photo}
          setMainImage={setMainImage}
          // onClick={() => {
          //   // 실제 이벤트클릭 함수
          //   // handleImageClick(photo.saveFileName);
          //   handleImageClick(photo.src);
          // }}
        />
      ))}
    </div>
  );
}
