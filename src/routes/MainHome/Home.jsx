import Footer from "./Footer/Footer";
import MainView from "./MainView/MainView";
import PhotoZone from "./PhotoZone/PhotoZone";
import Menus from "./Menus/Menus";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

function Home() {
  const { ref: photoZoneRef, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <div className="overflow-hidden">
      <div className="homeContainer bg-white">
        <section className="w-full h-max px-24">
          <MainView />
        </section>
        {/* 로고 고정 배경 이미지 */}
        <section className="flex bg-fixed bg-bottom bg-no-repeat h-[9rem] bg-[url('./assets/images/bgImage.png')]"></section>
        <section className="flex w-full h-max" ref={photoZoneRef}>
          <PhotoZone inView={inView} />
        </section>
        <section className="flex w-full h-max px-24">
          <Menus />
        </section>
      </div>
      <Footer />
    </div>
  );
}
export default Home;
