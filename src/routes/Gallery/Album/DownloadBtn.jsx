import { FiDownload } from "react-icons/fi";
import { extractFileName } from "../../../utils/extractFileName";
import { CircleButton as Button } from "../../../components/CircleButton";
import axios from "axios";

export default function DownloadBtn({ selectedPhoto }) {
  const handleDownloadBtnClick = async () => {
    const postId = window.location.pathname.split("/")[2];
    const fileName = extractFileName(selectedPhoto);
    const result = await axios
      .get(
        `${process.env.REACT_APP_SERVER}/file?postId=${postId}&fileName=${fileName}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => response.data);
    const fileBlob = new Blob([result], {
      type: "application/octet-stream",
    });
    const tempPhotoURL = URL.createObjectURL(fileBlob);
    const $aElement = document.createElement("a");

    $aElement.download = fileName;
    $aElement.href = tempPhotoURL;
    $aElement.hidden = true;

    $aElement.click();
    $aElement.remove();

    URL.revokeObjectURL(tempPhotoURL);
  };

  return (
    <Button
      onClick={() => handleDownloadBtnClick()}
      content={<FiDownload className="text-3xl" />}
    />
  );
}
