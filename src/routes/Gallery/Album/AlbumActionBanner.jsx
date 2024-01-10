import DownloadBtn from "./DownloadBtn";
import CommentActivationBtn from "./CommentActivationBtn";

const AlbumActionBanner = ({ selectedPhoto, setIsCommentVisible }) => {
  const toggleCommentVisibility = () => {
    setIsCommentVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col flex-start items-center w-[4.5rem] h-full py-4">
      <DownloadBtn selectedPhoto={selectedPhoto} />
      <CommentActivationBtn setIsCommentVisible={setIsCommentVisible} />
    </div>
  );
};

export default AlbumActionBanner;
