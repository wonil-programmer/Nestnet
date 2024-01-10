import DownloadBtn from "./DownloadBtn";

const AlbumActions = ({ selectedPhoto, setIsCommentVisible }) => {
  const toggleCommentVisibility = () => {
    setIsCommentVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center w-[4rem] h-full py-4 bg-rose-300">
      <DownloadBtn selectedPhoto={selectedPhoto} />
      <button onClick={toggleCommentVisibility}>Show Comments</button>
    </div>
  );
};

export default AlbumActions;
