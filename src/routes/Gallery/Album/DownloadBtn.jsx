import { FiDownload } from "react-icons/fi";
import { extractFileName } from "../../../utils/extractFileName";
import { CircleButton as Button } from "../../../components/CircleButton";

export default function DownloadBtn({ selectedPhoto }) {
  const fileName = extractFileName(selectedPhoto);

  return (
    <a download={fileName} href={selectedPhoto}>
      <Button content={<FiDownload className="text-3xl" />} />
    </a>
  );
}
