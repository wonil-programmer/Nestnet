import { useState } from "react";
import Dot from "../../../components/Dot";

// 배너 제목 상수
const BannerTitle = ["월간순위", "주간순위"];

const AttendanceBanner = ({ items: AttendanceRanks, isLoading }) => {
  const [slideIdx, setSlideIdx] = useState(1);

  const handleDotClick = (idx) => {
    setSlideIdx(idx + 1);
  };

  return (
    <div className="relative w-full h-full">
      <>
        {AttendanceRanks.map((item, idx) => (
          <div
            key={item.id}
            className={`slide absolute top-0 left-0 w-full h-full p-5 pt-4 text-black ${
              slideIdx === idx + 1 ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mb-1 text-sm font-bold text-home-primary">
              {BannerTitle[idx]}
            </div>
            <div className="flex flex-row w-full h-[1rem] mb-1 pr-2 text-xs font-semibold">
              <span className="w-10 mr-9">순위</span>
              <div className="flex flex-row w-full justify-between">
                <span>이름</span>
                <span>점수</span>
              </div>
            </div>
            <ul className="text-black pr-2">
              {item.map((item, idx) => (
                <li className="flex flex-row w-full h-[1.4rem] text-xs">
                  <span className="w-2 pl-2 mr-12">{idx + 1}</span>
                  <div className="flex flex-row w-full justify-between">
                    <span>{item.memberName}</span>
                    <span className="text-right">{item.point}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-row mb-1">
        {Array.from({ length: AttendanceRanks?.length }).map((_, idx) => (
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

export default AttendanceBanner;
