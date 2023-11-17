import { FaMagnifyingGlass } from "react-icons/fa6";

export default function AsidePhoto({ photo, setSelectedPhoto }) {
  const imageRootPath = `${process.env.REACT_APP_SERVER}/image`;
  const photoPath =
    imageRootPath + "/" + photo.saveFilePath + "/" + photo.saveFileName;

  const handleClickedPhoto = () => {
    setSelectedPhoto(photoPath);
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
