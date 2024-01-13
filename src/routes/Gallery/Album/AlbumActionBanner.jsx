import DownloadBtn from "./DownloadBtn";
import CommentActivationBtn from "./CommentActivationBtn";
import LikeBtn from "./LikeBtn";

const AlbumActionBanner = ({
  selectedPhoto,
  setIsDescriptionVisible,
  isMemberLiked,
}) => {
  return (
    <div className="flex flex-col flex-start items-center h-full mt-8 pr-3">
      <DownloadBtn selectedPhoto={selectedPhoto} />
      <CommentActivationBtn setIsDescriptionVisible={setIsDescriptionVisible} />
      <LikeBtn isMemberLiked={isMemberLiked} />
    </div>
  );
};

export default AlbumActionBanner;
