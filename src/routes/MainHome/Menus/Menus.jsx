import MenuCard from "./MenuCard";

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

  return (
    <section className="w-full pb-12 pt-[6rem]">
      <div className="text-5xl text-center font-semibold text-gray-700">
        서비스
      </div>
      <div className="menuContent h-fit max-w-7xl mx-auto py-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-10">
        {Services.map((service, idx) => (
          <MenuCard
            key={idx}
            imgSrc={service.imgSrc}
            mainTitle={service.mainTitle}
            subTitle={service.subTitle}
            path={service.link}
          />
        ))}
      </div>
    </section>
  );
}
