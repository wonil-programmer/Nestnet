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
    <footer class="w-full my-3">
      <div class="flex-col rounded shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
        <div class="flex-col px-60 py-8">
          {/* 동아리 소개 */}
          <div class="flex-col mb-8">
            <div class="mb-4 font-semibold text-slate-800/90">소개</div>
            <ul class="flex pl-2">
              {intros.map((intro) => (
                <li
                  key={intro.title}
                  class="mr-10 after:content-['|'] last:after:content-['']"
                >
                  <Link class="mr-10" to={intro.link} target="_blank">
                    <span class="text-slate-700/90 text-sm">{intro.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* 각종 링크들 */}
          <div class="flex-col">
            <div class="mb-4 font-semibold text-slate-700/90">
              <ul class="flex">
                {Links.map((link) => (
                  <li key={link.title}>
                    <Link class="mr-10" to={link.link} target="_blank">
                      <img
                        class="w-10 h-12"
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
          <div class="flex-col text-xs text-slate-700/75">
            <div class="mb-1">제작자</div>
            <ul>
              <li>
                <span>Front. </span>김강민, 허원일
              </li>
              <li>
                <span>Back. </span>김성호
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
