import { FaMagnifyingGlass } from "react-icons/fa6";
import { useContext } from "react";
import { MainPhotoContext } from "../../context/MainPhotoContext";

export default function AsidePhoto({ photo }) {
  // const filePath = filePath;
  // const saveFileName = saveFileName;
  // const photoPath = filePath + "/" + saveFileName;

  const { setMainImage } = useContext(MainPhotoContext);

  return (
    <div className="wrapper relative my-4 rounded-xl overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      {/* boxshadow 사이트의 Warm테마 */}
      <img
        className="w-full"
        key={photo.id}
        // 실제 photo src
        // src={photo.photoPath}
        src={`${process.env.PUBLIC_URL}/assets/${photo.src}`}
        alt={photo.alt}
      />
      <div
        className="cover absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center text-center text-sm bg-black opacity-0 text-white duration-300 ease-in-out hover:opacity-75 hover:cursor-pointer"
        onClick={() => {
          // 실제 이벤트클릭 함수
          // setMainImage(photo.photoPath);
          setMainImage(photo.src);
        }}
      >
        <FaMagnifyingGlass className={"text-4xl"} />
      </div>
    </div>
  );
}
