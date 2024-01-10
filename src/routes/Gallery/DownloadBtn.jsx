import { FiDownload } from "react-icons/fi";
import { extractFileName } from "../../utils/extractFileName";
import CircleButton from "../../components/CIrcleButton";

export default function DownloadBtn({ selectedPhoto }) {
  const fileName = extractFileName(selectedPhoto);

  const downloadPath = `url(${selectedPhoto})`;
  console.log(downloadPath);

  return (
    <a download={fileName} href={downloadPath}>
      <Button>
        <FiDownload className="text-3xl" />
      </Button>
    </a>
  );
}
