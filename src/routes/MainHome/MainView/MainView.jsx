import { FaArrowDown } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function MainView() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => {
      setIsLoaded(false);
    }, 1000);
  }, []);

  return (
    <div className="mvArea relative w-full h-screen">
      <div className="mvImg absolute top-0 left-0 w-full h-full">
        <div className="image-wrapper w-full h-full"></div>
      </div>
      <div className="mvTitle absolute top-80 left-36">
        <div
          className={`text-home-maintitle text-slate-800 font-semibold ${
            isLoaded ? "animate-fadeout" : "animate-fadein"
          }`}
        >
          {isLoaded ? "Who is the best?" : "Nestnet"}
        </div>
        <div
          className={`text-home-subtitle text-slate-700 font-medium ${
            isLoaded ? "" : "animate-fadein"
          }`}
        >
          {isLoaded ? "" : "소프트웨어학부 1등 학술동아리"}
        </div>
      </div>
      <FaArrowDown className="absolute bottom-6 left-2/4 -translate-x-2/4 text-3xl text-stone-800 animate-bounce" />
    </div>
  );
}
