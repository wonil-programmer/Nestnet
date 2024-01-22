import { useState } from "react";
import Dot from "../../../components/Dot";
import { Link } from "react-router-dom";

const NewPosts = ({ items, isLoading }) => {
  const [slideIdx, setSlideIdx] = useState(1);

  const nextSlide = () => {
    setSlideIdx((prevIdx) => (prevIdx % items.length) + 1);
  };

  const prevSlide = () => {
    setSlideIdx((prevIdx) => (prevIdx === 1 ? items.length : prevIdx - 1));
  };

  const handleDotClick = (idx) => {
    setSlideIdx(idx + 1);
  };

  return (
    <div className="relative w-full h-full p-6 pr-4">
      <h1 className="mb-3 text-sm font-semibold text-black">최근 글</h1>
      <ul className="w-full h-full text-slate-600">
        {isLoading ? (
          <h1>isLoading</h1>
        ) : (
          items.map((obj) => (
            <Link>
              <li
                key={obj.id}
                className="w-full h-[2rem] mb-[0.7rem] hover:text-black"
              >
                <div className="text-sm truncate">{obj.title}</div>
                <div className="text-xs">{obj.postDate}</div>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};

export default NewPosts;
