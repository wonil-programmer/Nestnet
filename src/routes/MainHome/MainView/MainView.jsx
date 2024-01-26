import { FaCalendar } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import SlidingBanner from "../../../components/SlidingBanner";
import { SliderItems } from "./SliderItems";
import RecentPosts from "./RecentPosts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function MainView() {
  const { data: recentPosts, isLoading: isNewPostsLoading } = useGetNewPosts();
  const {
    data: {
      weeklyStatisticsDtoList: weeklyAttdRank = [],
      monthlyStatisticsDtoList: monthlyAttdRank = [],
    } = {},
    isLoading: isAttdRanksLoading,
  } = useGetAttendance();
  const [attdRankSlides, setAttdRankSlides] = useState([]);

  useEffect(() => {
    if (weeklyAttdRank.length !== 0 && monthlyAttdRank.length !== 0) {
      setAttdRankSlides([[...weeklyAttdRank], [...monthlyAttdRank]]);
    }
  }, [weeklyAttdRank, monthlyAttdRank]);

  return (
    <div className="mVWrapper relative h-screen pt-[6rem] pb-[7rem]">
      <div className="flex flex-row justify-center">
        <div className="flex flex-row justify-between max-w-[76rem] max-h-max">
          <div className="relative w-max h-max">
            <div className="relative min-w-[60rem] w-[60rem] h-[40rem] mr-4 rounded-[1rem] overflow-hidden">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover brightness-95"
                src="assets/mainViewBg.jpg"
                alt="mainView"
              />
              <div
                className={`absolute bottom-0 right-0 w-[4.5rem] h-[4.5rem] rounded-tl-[0.5rem] bg-white inline`}
              ></div>
            </div>
            <div className="absolute bottom-0 right-4 w-[4rem] h-[4rem] rounded-[0.5rem] white border-2 shadow-md transition-all overflow-hidden">
              <div className="flex flex-col justify-center items-center w-full h-full cursor-pointer bg-rose-600">
                <FaCalendarCheck className="text-4xl text-white" />
                {/* <FaCalendar className="text-4xl text-slate-400" /> */}
              </div>
            </div>
          </div>
          <div className="max-w-max h-[40rem] ml-1">
            <div className="w-[14rem] h-[17.8rem] rounded-[0.5rem] border-2 border-home-primary bg-white shadow-md">
              <RecentPosts items={recentPosts} isLoading={isNewPostsLoading} />
            </div>
            <div className="relative w-[14rem] h-[7rem] mt-[1.2rem] box-border rounded-[0.5rem] overflow-hidden brightness-95 shadow-md">
              <SlidingBanner items={SliderItems} isImgObj={true} />
            </div>
            <div className="w-[14rem] h-[12.8rem] mt-[1.2rem]  rounded-[0.5rem] border-2 border-home-primary bg-white overflow-hidden shadow-md">
              <SlidingBanner
                items={attdRankSlides}
                isImgObj={false}
                isArrow={false}
                isLoading={isAttdRanksLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// REST: 최근글 조회
const useGetNewPosts = () => {
  return useQuery({
    queryKey: ["recent-posts"],
    queryFn: async () => {
      const recentPostsURL = `${process.env.REACT_APP_SERVER}/post/recent-posts`;

      // TEST: json-server
      // const recentPostsURL = `${process.env.REACT_APP_SERVER}/recent-posts`;

      return await axios.get(recentPostsURL).then((res) => {
        return res.data.response.dtoList;
      });
    },
  });
};

// REST: 출석정보 조회
const useGetAttendance = () => {
  return useQuery({
    queryKey: ["attendance-statistics"],
    queryFn: async () => {
      const attendanceURL = `${process.env.REACT_APP_SERVER}/attendance/statistics`;
      // TEST: json-server
      // const attendanceURL = `${process.env.REACT_APP_SERVER}/attendance-statistics`;

      return await axios.get(attendanceURL).then((res) => {
        console.log(res.data);
        return res.data.response;
      });
    },
  });
};
