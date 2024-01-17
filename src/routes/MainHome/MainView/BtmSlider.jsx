import SliderBtn from "../../../components/Button/SliderBtn";
import { useState } from "react";
import { btmSliderItems } from "./btmSliderItems";

export default function BtmSlider() {
  const [slideIdx, setSlideIdx] = useState(1);

  const nextSlide = () => {
    if (slideIdx !== btmSliderItems.length) {
      setSlideIdx(slideIdx + 1);
    } else if (slideIdx === btmSliderItems.length) {
      setSlideIdx(1);
    }
  };
  const prevSlide = () => {
    if (slideIdx !== 1) {
      setSlideIdx(slideIdx - 1);
    } else if (slideIdx === 1) {
      setSlideIdx(btmSliderItems.length);
    }
  };

  return (
    <div className="relative w-full h-full">
      {btmSliderItems.map((obj, idx) => {
        console.log(obj);
        return (
          <div
            key={obj.id}
            className={`slide w-full h-full ${
              slideIdx === idx + 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={obj.src} alt="" />
          </div>
        );
      })}
      <div className="absolute top-0 left-0 flex flex-row justify-between w-full h-full ">
        <SliderBtn moveSlide={prevSlide} direction={"prev"} />
        <SliderBtn moveSlide={nextSlide} direction={"next"} />
      </div>
    </div>
  );
}
