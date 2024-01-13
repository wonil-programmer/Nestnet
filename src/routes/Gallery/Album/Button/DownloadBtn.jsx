import { FiDownload } from "react-icons/fi";
import { extractFileName } from "../../../../utils/extractFileName";
import { CircleButton as Button } from "../../../../components/CircleButton";

export default function DownloadBtn({ selectedPhoto }) {
  const fileName = extractFileName(selectedPhoto);
  const downloadPath = `url(${selectedPhoto})`;

  return (
    <a download={fileName} href={downloadPath} className="mb-1">
      <Button content={<FiDownload className="text-3xl" />} />
    </a>
  );
}
