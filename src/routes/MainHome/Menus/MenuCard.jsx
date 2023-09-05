import { Link } from "react-router-dom";

export default function MenuCard({ mainTitle, subTitle, link }) {
  return (
    <Link to={`${link}`}>
      <div class="w-menu h-64 p-10 bg-white rounded-2xl shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(228,95,132,0.15)] duration-300 hover:-translate-y-2 hover:ease-in-out hover:shadow-pink-300 hover:shadow-lg">
        <div class="h-11 mb-2">
          <span class="menuIcon mr-3">icon</span>
        </div>
        <div class="mainTitle mb-2">
          <span class="text-2xl font-semibold">{mainTitle}</span>
        </div>
        <h2 class="subTitle h-20">{subTitle}</h2>
      </div>
    </Link>
  );
}
