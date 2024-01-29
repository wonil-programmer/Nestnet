import { Link } from "react-router-dom";
import StringCombinator from "../../../utils/Combinator/StringCombinator";
import { StringTranslator } from "../../../utils/Translator/StringTranslator";

const RecentPosts = ({ items, isLoading }) => {
  if (isLoading) return <></>;

  return (
    <div className="relative w-full h-full p-5">
      <h1 className="mb-4 text-md font-bold text-home-primary">최신 글</h1>
      <ul className="w-full h-full text-slate-600">
        {items.length === 0 ? (
          <>
            <h2 className="text-[0.8rem] font-slate-600">
              최신 게시글이 없습니다.
              <br />
              새로운 글을 작성해보세요!
            </h2>
          </>
        ) : (
          items?.map((post) => (
            <li
              key={post.id}
              className="flex flex-row w-full h-[2rem] mb-[0.7rem] hover:text-black"
            >
              <span className="w-fit h-[1.3rem] mr-3 px-2 py-[0.2rem] text-[0.6rem] text-nowrap text-white font-semibold bg-home-primary rounded-md">
                {StringTranslator.getPostCategoryKOR(post.postCategory)}
              </span>
              <div className="flex flex-col w-full truncate">
                <Link
                  to={StringCombinator.getRecentPostPath(
                    StringTranslator.getPostCategoryURL(post.postCategory),
                    post.id
                  )}
                >
                  <div className="text-[0.8rem] truncate">{post.title}</div>
                </Link>
                <div className="text-[0.65rem] truncate">
                  {StringCombinator.getFormatDate(post.createdTime)}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentPosts;
