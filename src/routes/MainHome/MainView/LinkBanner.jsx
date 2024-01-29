import { useState } from "react";
import SliderBtn from "../../../components/Button/SliderBtn";
import Dot from "../../../components/Dot";

const LinkBanner = ({ items }) => {
  const [slideIdx, setSlideIdx] = useState(1);

  const nextSlide = () => {
    setSlideIdx((prevIdx) => (prevIdx % items?.length) + 1);
  };
  const prevSlide = () => {
    setSlideIdx((prevIdx) => (prevIdx === 1 ? items?.length : prevIdx - 1));
  };

  const handleDotClick = (idx) => {
    setSlideIdx(idx + 1);
  };

  return (
    <div className="relative w-full h-full">
      <>
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`slide absolute top-0 left-0 w-full h-full ${
              slideIdx === idx + 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={item.src} alt="" />
          </div>
        ))}
      </>
      <div className="absolute top-0 left-0 flex flex-row justify-between w-full h-full ">
        <SliderBtn moveSlide={prevSlide} direction={"prev"} />
        <SliderBtn moveSlide={nextSlide} direction={"next"} />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-row mb-1">
        {Array.from({ length: items?.length }).map((_, idx) => (
          <Dot
            key={idx}
            active={slideIdx === idx + 1 ? "active" : ""}
            idx={idx}
            setSlideIdx={handleDotClick}
          />
        ))}
      </div>
    </div>
  );
};

export default LinkBanner;
