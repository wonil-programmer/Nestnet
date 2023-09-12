import { FiDownload } from "react-icons/fi";
import { MainPhotoContext } from "../../context/MainPhotoContext";
import { useContext } from "react";

export default function DownloadBtn() {
  const { mainImage } = useContext(MainPhotoContext);

  const downloadPath = `${process.env.PUBLIC_URL}/assets/${mainImage}`;

  return (
    <a download={mainImage} href={downloadPath}>
      <button className="flex flex-col items-center box-content p-1 w-[2.3rem] h-[2.3rem] mr-1 rounded-full hover:bg-gray-200 hover:scale-105 duration-300">
        <FiDownload className="text-3xl" />
      </button>
    </a>
  );
}
