import { FaCalendar } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { TfiMouse } from "react-icons/tfi";
import BtmSlider from "./BtmSlider";

export default function MainView() {
  return (
    <div className="mVWrapper relative w-full h-screen pt-[6rem]">
      <div className="max-w-full h-full">
        <div className="flex flex-row justify-between max-w-[76rem] max-h-max mx-auto">
          <div className="relative w-[60rem] h-[38rem] mr-1 rounded-[3rem] ">
            <div
              className={`before:block before:absolute before:-top-[7rem] before:w-[7rem] before:h-[7rem] before:bg-black before:rounded-br-[3rem] before:opacity- 
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
          <div className="max-w-max h-[38rem] ml-1">
            <div className="w-[14rem] h-[22rem] rounded-[3rem] bg-stone-200"></div>
            <div className="relative w-[14rem] h-[14rem] mt-[2rem] box-border rounded-[3rem] overflow-hidden shadow-md">
              <BtmSlider />
            </div>
          </div>
        </div>
      </div>
      <TfiMouse className="absolute bottom-6 left-1/2 -translate-x-1/2 text-4xl text-stone-800 animate-bounce" />
    </div>
  );
}
