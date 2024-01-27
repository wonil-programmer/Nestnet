import DownloadBtn from "./DownloadBtn";
import CommentActivationBtn from "./CommentActivationBtn";
import LikeBtn from "./LikeBtn";
import DeleteBtn from "./Button/DeleteBtn";
import ModifyBtn from "./Button/ModifyBtn";

const AlbumActionBanner = ({
  selectedPhoto,
  setIsDescriptionVisible,
  isMemberLiked,
  likeCount,
  data: existingAlbumData,
}) => {
  return (
    <div className="flex flex-col flex-start items-center h-full mt-8 pr-3">
      <DownloadBtn selectedPhoto={selectedPhoto} />
      <CommentActivationBtn setIsDescriptionVisible={setIsDescriptionVisible} />
      <LikeBtn isMemberLiked={isMemberLiked} likeCount={likeCount} />
      <DeleteBtn />
      <ModifyBtn existingData={existingAlbumData} />
    </div>
  );
};

export default AlbumActionBanner;
