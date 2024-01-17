import { Link } from "react-router-dom";

export default function MenuCard({ imgSrc, mainTitle, subTitle, link }) {
  return (
    <Link to={`${link}`}>
      <div
        className={`flex flex-col w-[22rem] h-[30rem] bg-white rounded-2xl overflow-hidden 
      shadow-[0_8px_30px_rgb(0,0,0,0.12)] duration-300 hover:-translate-y-2 hover:ease-in-out hover:shadow-lg`}
      >
        <div className="w-full h-1/2">
          <img
            className="w-full h-full object-cover brightness-90"
            src={`${imgSrc}`}
            alt="servicePhoto"
          />
        </div>
        <div className="w-full h-1/2 p-8 text-black">
          <div className="mainTitle mb-4">
            <span className="text-2xl font-semibold">{mainTitle}</span>
          </div>
          <h2 className="subTitle h-20">{subTitle}</h2>
        </div>
      </div>
    </Link>
  );
}
