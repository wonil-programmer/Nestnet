import MenuCard from "./MenuCard";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export default function Menus() {
  class Service {
    constructor(imgSrc, mainTitle, link) {
      this.imgSrc = imgSrc;
      this.mainTitle = mainTitle;
      this.link = link;
    }
  }
  const Services = [
    new Service("assets/unified_board.jpg", "통합 게시판", ""),
    new Service("assets/photo_board.jpg", "사진 게시판", "gallery"),
    new Service("assets/info_board.jpg", "자료 게시판", ""),
  ];

  const { ref: observeCardRef, inView } = useInView();
  const [isVisible, setIsVisible] = useState(false);

  // ref가 inView 영역에 도달하면 다음 페이지를 불러옴
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <section className="w-full pb-12 pt-[5rem]">
      <div className="text-[2.5rem] text-center font-semibold text-gray-700">
        서비스
      </div>
      <div className="menuContent h-fit max-w-7xl mx-auto py-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-10">
        {Services.map((service, idx) => (
          <div ref={observeCardRef}>
            <MenuCard
              key={idx}
              isVisible={isVisible}
              imgSrc={service.imgSrc}
              mainTitle={service.mainTitle}
              path={service.link}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
