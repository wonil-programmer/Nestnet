import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function SliderBtn({ moveSlide, direction }) {
  return (
    <>
      <button onClick={moveSlide} className="opacity-80">
        {direction === "next" ? (
          <IoIosArrowForward className="text-4xl" />
        ) : (
          <IoIosArrowBack className="text-4xl" />
        )}
      </button>
    </>
  );
}
