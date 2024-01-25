import { Link } from "react-router-dom";

/**
 * 서비스 메뉴 카드
 * @param {string, string, string} param0
 * @returns
 */
export default function MenuCard({ isVisible, imgSrc, mainTitle, path }) {
  return (
    <Link to={`${path}`}>
      <div
        className={`${isVisible ? "animate-swapdown" : "opacity-0"} 
        flex flex-col w-full h-full relative bg-white rounded-lg overflow-hidden shadow-lg  
        duration-300 hover:ease-in-out hover:shadow-xl`}
      >
        <div className="w-full h-full overflow-hidden ease-in-out duration-300 hover:scale-110 hover:duration-300">
          <img
            className="w-full h-full object-cover brightness-90"
            src={imgSrc}
            alt="serviceThumbnail"
          />
        </div>
        <div className="absolute right-0 bottom-0 w-fit px-4 pt-2 pb-1 text-white rounded-tl-lg opacity-90">
          <div className="mainTitle mb-2 text-white">
            <span className="text-xl">{mainTitle}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
