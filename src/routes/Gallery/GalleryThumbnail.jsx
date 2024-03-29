import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import StringCombinator from "../../utils/Combinator/StringCombinator";

/**
 * 갤러리 상의 앨범들의 썸네일
 */
const GalleryThumbnail = ({ album }) => {
  return (
    <>
      <div className="relative flex flex-col w-full h-min rounded-xl overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
        <img
          src={StringCombinator.getImagePath(album)}
          alt="thumbnail"
          className="rounded-xl"
        />
        <div className="absolute top-0 left-0 w-full h-full rounded-xl hover:bg-black hover:opacity-80 opacity-0 duration-300 cursor-zoom-in">
          <div className="mt-6 mx-6 text-center text-white text-2xl font-bold">
            {album.title}
          </div>
          <div className="metadata absolute right-0 bottom-0 m-5 mr-6 text-[#666666]">
            <span className="visits mr-2">
              <FontAwesomeIcon icon={faEye} /> <span>{album.viewCount}</span>
            </span>
            <span className="likes ml-2">
              <FontAwesomeIcon icon={faHeart} /> <span>{album.likeCount}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(GalleryThumbnail);
