import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Profile } from "../routes/MainHome/Profile";

export const HeadNavbar = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBgColor = () => {
    if (window.scrollY >= 20) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBgColor);

  return (
    <>
      <div
        className={`${
          navbar ? "shadow-sm" : null
        } flex flex-row justify-between items-center fixed top-0 left-0 px-36 w-full h-[6rem] p-1 z-10 transition-all bg-white`}
      >
        <div className="navLeft mr-auto">
          <Link to="/">
            <h1 className="text-3xl">Nestnet</h1>
          </Link>
        </div>
        <div className="navCtr flex-none">
          <ul className="h-full">
            <li className="h-full px-8 inline-block font-semibold cursor-pointer">
              홈
            </li>
            <li className="h-full px-8 inline-block font-semibold cursor-pointer">
              게시판
            </li>
            <li className="h-full px-8 inline-block font-semibold cursor-pointer">
              서비스
            </li>
          </ul>
        </div>
        <div className="navRight ml-auto">
          <div className="">
            <Profile />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
