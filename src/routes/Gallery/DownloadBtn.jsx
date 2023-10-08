import { FiDownload } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function DownloadBtn() {
  const selectedPhotoUrl = useSelector((state) => state.album.selectedPhoto);
  const downloadPath = `url(${selectedPhotoUrl})`;

  const parts = selectedPhotoUrl.split(/[\\/]/);
  const fileName = parts[parts.length - 1];

  return (
    <a download={fileName} href={downloadPath}>
      <button className="flex flex-col items-center box-content p-1 w-[2.3rem] h-[2.3rem] mr-1 rounded-full hover:bg-gray-200 hover:scale-105 duration-300">
        <FiDownload className="text-3xl" />
      </button>
    </a>
  );
}
