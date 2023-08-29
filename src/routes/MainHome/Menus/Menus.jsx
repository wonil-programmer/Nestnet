import MenuCard from "./MenuCard";

export default function Menus() {
  class Service {
    constructor(icon, mainTitle, subTitle, link) {
      this.icon = icon;
      this.mainTitle = mainTitle;
      this.subTitle = subTitle;
      this.link = link;
    }
  }
  const Services = [
    new Service(
      "",
      "통합 게시판",
      "자유, 진로, 개발에 관련하여 의견을 공유할 수 있는 게시판",
      ""
    ),
    new Service(
      "",
      "사진 게시판",
      "동아리 활동의 매 순간을 사진으로 기록하여 저장한 공간",
      "gallery"
    ),
    new Service(
      "",
      "족보",
      "전공, 교양 할 것 없이 수많은 과목들의 기출문제를 보관하는 곳",
      ""
    ),
    new Service(
      "",
      "통합 게시판",
      "자유, 진로, 개발에 관련하여 의견을 공유할 수 있는 게시판",
      ""
    ),
    new Service(
      "",
      "사진 게시판",
      "동아리 활동의 매 순간을 사진으로 기록하여 저장한 공간",
      "gallery"
    ),
    new Service(
      "",
      "족보",
      "전공, 교양 할 것 없이 수많은 과목들의 기출문제를 보관하는 곳",
      ""
    ),
    new Service(
      "",
      "통합 게시판",
      "자유, 진로, 개발에 관련하여 의견을 공유할 수 있는 게시판",
      ""
    ),
    new Service(
      "",
      "사진 게시판",
      "동아리 활동의 매 순간을 사진으로 기록하여 저장한 공간",
      "gallery"
    ),
    new Service(
      "",
      "족보",
      "전공, 교양 할 것 없이 수많은 과목들의 기출문제를 보관하는 곳",
      ""
    ),
  ];
  return (
    <section class="w-full min-h-screen h-min pb-12">
      <div class="text-5xl text-center font-semibold mt-32 mb-4">서비스</div>
      <div class="menuContent h-full">
        <ul class="menuList w-menus mx-auto flex flex-wrap">
          {Services.map((service) => (
            <li class="h-64 mt-6 px-5">
              <MenuCard
                mainTitle={service.mainTitle}
                subTitle={service.subTitle}
                link={service.link}
              ></MenuCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
