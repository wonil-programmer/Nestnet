import { useRef, memo } from "react";

const TitleInput = ({ title, setTitle }) => {
  const titleInputRef = useRef(null);

  // 게시물 제목 작성
  const handleTitleChange = () => {
    let titleInputValue = titleInputRef.current.value;
    setTitle(titleInputValue);
  };

  return (
    <>
      <input
        id={"titleInput"}
        type={"text"}
        value={title}
        minLength={4}
        maxLength={30}
        onChange={handleTitleChange}
        placeholder={"제목 추가"}
        autoComplete={"off"}
        ref={titleInputRef}
        className={
          "title w-full mb-2 pl-6 py-3 placeholder:text-stone-500 placeholder:font-medium text-black font-medium bg-slate-100 rounded-3xl focus:placeholder:text-slate-400 focus:font-medium outline-red-400"
        }
      />
    </>
  );
};

export default memo(TitleInput);
