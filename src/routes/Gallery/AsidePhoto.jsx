import { FaMagnifyingGlass } from "react-icons/fa6";
import { setSelectedPhoto } from "./albumReducer";
import { useDispatch } from "react-redux";

export default function AsidePhoto({ photo }) {
  const imageRootPath = "http://172.20.10.8:8080/image";
  let saveFilePath = photo.saveFilePath;
  let saveFileName = photo.saveFileName;
  let photoPath = imageRootPath + "/" + saveFilePath + "/" + saveFileName;

  const clickDispatch = useDispatch();
  const handleClickedPhoto = () => {
    clickDispatch(setSelectedPhoto(photoPath));
  };
  return (
    <div className="wrapper relative my-4 rounded-md overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      {/* boxshadow 사이트의 Warm테마 */}
      <img className="w-full" key={photo.id} src={photoPath} alt={photo.alt} />
      <div
        className="cover absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center text-center text-sm bg-black opacity-0 text-white duration-300 ease-in-out hover:opacity-75 hover:cursor-pointer"
        onClick={handleClickedPhoto}
      >
        <FaMagnifyingGlass className={"text-4xl"} />
      </div>
    </div>
  );
}
