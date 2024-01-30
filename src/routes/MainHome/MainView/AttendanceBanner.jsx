import { useState } from "react";
import Dot from "../../../components/Dot";

// 배너 제목 상수
const BannerTitle = ["주간순위", "월간순위"];

const AttendanceBanner = ({ items: attendanceRanks, isLoading }) => {
  const [slideIdx, setSlideIdx] = useState(1);

  const handleDotClick = (idx) => {
    setSlideIdx(idx + 1);
  };

  return (
    <div className="relative w-full h-full">
      <>
        {attendanceRanks?.map((attendanceRank, idx) => (
          <div
            key={attendanceRank.id}
            className={`slide absolute top-0 left-0 w-full h-full p-5 pt-4 text-black ${
              slideIdx === idx + 1 ? "visible" : "invisible"
            }`}
          >
            <div className="mb-[0.35rem] text-sm font-bold text-home-primary">
              {BannerTitle[idx]}
            </div>
            <div className="flex flex-row w-full h-[1rem] mb-1 text-xs font-semibold">
              <span className="w-10 mr-12">순위</span>
              <div className="flex flex-row w-full justify-between">
                <span>이름</span>
                <span>점수</span>
              </div>
            </div>
            {isLoading ? (
              // 로딩스피너
              <p></p>
            ) : attendanceRank.length === 0 ? (
              <p className="w-full pt-10 text-center text-xs text-stone-500">
                출석자가 없습니다
              </p>
            ) : (
              <>
                <ul className="text-black pr-1">
                  {attendanceRank.map((ranker, idx) => (
                    <li className="flex flex-row w-full h-[1.4rem] text-xs">
                      <span className="w-2 pl-2 mr-14">{idx + 1}</span>
                      <div className="flex flex-row w-full justify-between">
                        <span>{ranker.memberName}</span>
                        <span className="text-right">{ranker.point}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-row mb-1">
        {Array.from({ length: attendanceRanks?.length }).map((_, idx) => (
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
