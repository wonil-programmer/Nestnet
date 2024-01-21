import { FaCalendar } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { TfiMouse } from "react-icons/tfi";
import LinkSliderMenu from "./LinkSliderMenu";

export default function MainView() {
  return (
    <div className="mVWrapper relative w-full h-screen pt-[6rem]">
      <div className="max-w-full h-full">
        <div className="flex flex-row justify-between max-w-[76rem] max-h-max mx-auto">
          <div className="relative w-[60rem] h-[40rem] mr-1 rounded-[3rem] bg-slate-100">
            <div
              className={`before:block before:absolute before:-top-[6rem] before:w-[6rem] before:h-[6rem] before:bg-slate-100 before:rounded-br-[3rem] before:opacity- 
            absolute bottom-0 right-0 w-[6rem] h-[6rem] rounded-tl-2xl bg-white inline`}
            >
              <div className="absolute bottom-0 right-0 w-[5rem] h-[5rem] rounded-2xl white border-2 shadow-md transition-all overflow-hidden">
                <div className="flex flex-col justify-center items-center w-full h-full cursor-pointer bg-rose-500">
                  <FaCalendarCheck className="text-4xl text-white" />
                  {/* <FaCalendar className="text-4xl text-slate-400" /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-max h-[40rem] ml-1">
            <div className="w-[14rem] h-[18rem] rounded-[2rem] bg-stone-200 shadow-md"></div>
            <div className="relative w-[14rem] h-[7rem] mt-[1rem] box-border rounded-[2rem] overflow-hidden shadow-md">
              <LinkSliderMenu />
            </div>
            <div className="w-[14rem] h-[13rem] mt-[1rem] rounded-[2rem] bg-stone-200 shadow-md"></div>
          </div>
        </div>
      </div>
      <TfiMouse className="absolute bottom-6 left-1/2 -translate-x-1/2 text-4xl text-stone-800 animate-bounce" />
    </div>
  );
}
