import { Link } from "react-router-dom";
import logo1 from "../../../assets/images/충북대전정대.png";
export default function Footer() {
  class Content {
    constructor(title, link, imgPath) {
      this.title = title;
      this.link = link;
      this.imgPath = imgPath;
    }
  }
  const intros = [
    new Content("동아리 연혁", "history"),
    new Content("동아리 회칙", "rules"),
    new Content("지도교수 및 임원", "executives"),
    new Content("전 임원 소개", "former-executives"),
  ];
  const Links = [
    new Content(
      "소프트웨어학부 홈페이지",
      "https://software.cbnu.ac.kr/",
      logo1
    ),
  ];

  return (
    <footer className="w-full h-[25qsrem] border-t-2 border-t-slate-100 bg-red-100/10">
      <div className="flex flex-col w-full min-w-max px-60 py-10">
        {/* 동아리 소개 */}
        <div className="flex-col mb-8">
          <div className="min-w-max mb-4 font-semibold text-slate-800/90">
            소개
          </div>
          <ul className="flex pl-2">
            {intros.map((intro) => (
              <li
                key={intro.title}
                className="min-w-max mr-10 after:content-['|'] last:after:content-['']"
              >
                <Link className="mr-10" to={intro.link} target="_blank">
                  <span className="text-slate-700/90 text-sm">
                    {intro.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* 각종 링크들 */}
        <div className="flex-col">
          <div className="mb-4 font-semibold text-slate-700/90">
            <ul className="flex min-w-max">
              {Links.map((link) => (
                <li key={link.title}>
                  <Link className="mr-10" to={link.link} target="_blank">
                    <img
                      className="w-10 h-12"
                      src={link.imgPath}
                      alt={link.title}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* 제작자 */}
        <div className="min-w-max flex-col text-xs text-slate-700/75">
          <div className="mb-1">제작자</div>
          <ul>
            <li>
              <span>Front. </span>김강민, 허원일
            </li>
            <li>
              <span>Back. </span>김성호
            </li>
            <li>
              <span>Design. </span>허원일
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
