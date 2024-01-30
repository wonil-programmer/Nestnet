import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  // ref가 inView 영역에 도달하면 메뉴카드를 불러옴
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
      <div className="menuContent h-fit max-w-7xl mx-auto py-20 grid grid-rows-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-10">
        {Services.map((service, idx) => (
          <Link to={`${service.link}`}>
            <div
              className={`${isVisible ? "animate-swapdown" : "opacity-0"} 
            flex flex-col w-full h-full relative bg-white rounded-lg overflow-hidden shadow-lg  
            duration-300 hover:ease-in-out hover:shadow-xl`}
              key={idx}
              ref={observeCardRef}
            >
              <div className="w-full h-full overflow-hidden ease-in-out duration-300 hover:scale-110 hover:duration-300">
                <img
                  className="w-full h-full object-cover brightness-90"
                  src={service.imgSrc}
                  alt="serviceThumbnail"
                />
              </div>
              <div className="absolute right-0 bottom-0 w-fit px-4 pt-2 pb-1 text-white rounded-tl-lg opacity-90">
                <div className="mainTitle mb-2 text-white">
                  <span className="text-xl">{service.mainTitle}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
