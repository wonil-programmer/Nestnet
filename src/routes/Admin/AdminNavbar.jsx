import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <>
      <div className="w-full h-20 fixed top-0 flex flex-row bg-home-secondary z-20">
        <h1 className="ml-8 text-3xl font-semibold my-auto pb-2 text-white">
          관리자 페이지
        </h1>
      </div>
      <section className="fixed left-0 w-[14rem] px-4 pt-[110px] h-screen max-h-screen border-r-2 border-[#D9D9D9] z-10"></section>
      <Outlet />
    </>
  );
};

export default AdminNavBar;
