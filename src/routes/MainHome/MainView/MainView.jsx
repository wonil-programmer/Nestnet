import { FaCalendar } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { TfiMouse } from "react-icons/tfi";
import Slider from "../../../components/Slider";
import { SliderItems } from "./SliderItems";
import NewPosts from "./NewPosts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function MainView() {
  const { data: newPosts, isLoading: isNewPostsLoading } = useGetNewPosts();

  return (
    <div className="mVWrapper relative w-full pt-[6rem]">
      <div className="max-w-full h-full">
        <div className="flex flex-row justify-between max-w-[76rem] max-h-max mx-auto">
          <div className="relative w-max h-max">
            <div className="relative min-w-[60rem] w-[60rem] h-[40rem] mx-4 rounded-[3rem] overflow-hidden">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover brightness-95 animate-zoomout"
                src="assets/a2.jpg"
                alt="mainView"
              />
              <img
                className="absolute top-0 left-0 w-full h-full object-cover brightness-95 animate-zoomoutnext"
                src="assets/a2.jpg"
                alt="mainView"
              />
              <div
                className={`absolute bottom-0 right-0 w-[6rem] h-[6rem] rounded-tl-2xl bg-white inline`}
              ></div>
            </div>
            <div className="absolute bottom-0 right-4 w-[5rem] h-[5rem] rounded-2xl white border-2 shadow-md transition-all overflow-hidden">
              <div className="flex flex-col justify-center items-center w-full h-full cursor-pointer bg-rose-500">
                <FaCalendarCheck className="text-4xl text-white" />
                {/* <FaCalendar className="text-4xl text-slate-400" /> */}
              </div>
            </div>
          </div>
          <div className="max-w-max h-[40rem] ml-1">
            <div className="w-[14rem] h-[18rem] rounded-[2rem] bg-home-background shadow-md">
              <NewPosts items={newPosts} isLoading={isNewPostsLoading} />
            </div>
            <div className="relative w-[14rem] h-[7rem] mt-[1rem] box-border rounded-[2rem] overflow-hidden shadow-md">
              <Slider items={SliderItems} />
            </div>
            <div className="w-[14rem] h-[13rem] mt-[1rem] rounded-[2rem] bg-stone-200 shadow-md"></div>
          </div>
        </div>
      </div>
      <TfiMouse className="absolute bottom-6 left-1/2 -translate-x-1/2 text-4xl text-stone-800 animate-bounce" />
    </div>
  );
}

// REST: 최신글 조회
const useGetNewPosts = () => {
  return useQuery({
    queryKey: ["new-posts"],
    queryFn: async () => {
      const newPostsURL = `${process.env.REACT_APP_SERVER}/new-posts`;
      return await axios.get(newPostsURL).then((res) => res.data);
    },
  });
};
