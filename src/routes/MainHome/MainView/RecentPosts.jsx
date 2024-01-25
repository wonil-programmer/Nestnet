import { useState } from "react";
import Dot from "../../../components/Dot";
import { Link } from "react-router-dom";

const RecentPosts = ({ items, isLoading }) => {
  // const [slideIdx, setSlideIdx] = useState(1);

  // const nextSlide = () => {
  //   setSlideIdx((prevIdx) => (prevIdx % items.length) + 1);
  // };

  // const prevSlide = () => {
  //   setSlideIdx((prevIdx) => (prevIdx === 1 ? items.length : prevIdx - 1));
  // };

  // const handleDotClick = (idx) => {
  //   setSlideIdx(idx + 1);
  // };

  return (
    <div className="relative w-full h-full p-6 pr-4">
      <h1 className="mb-2 text-sm font-semibold text-black">최근 글</h1>
      <ul className="w-full h-full text-slate-600">
        {isLoading ? (
          <h1>isLoading</h1>
        ) : (
          items.map((post) => (
            <li
              key={post.id}
              className="flex flex-row items-center w-full h-[2rem] mb-[0.7rem] hover:text-black"
            >
              <span className="w-fit h-[1.3rem] mr-3 px-2 py-[0.2rem] text-[0.6rem] text-nowrap text-white font-semibold bg-home-primary rounded-md">
                자유
              </span>
              <div className="flex flex-col w-full truncate">
                <Link to={`${post.postCategory}/${post.id}`}>
                  <div className="text-[0.85rem] leading-[110%] truncate">
                    {post.title}
                  </div>
                </Link>
                <div className="text-[0.65rem] leading-[110%] truncate">
                  {post.createdTime}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentPosts;
