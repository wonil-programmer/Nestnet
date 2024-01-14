import { forwardRef } from "react";

const TitleInput = ({ title, onTitleChange }, ref) => {
  return (
    <>
      <input
        id={"titleInput"}
        type={"text"}
        value={title}
        minLength={4}
        maxLength={30}
        onChange={onTitleChange}
        placeholder={"제목 추가"}
        autoComplete={"off"}
        ref={ref}
        className={
          "title w-full mb-2 pl-6 py-3 placeholder:text-stone-500 placeholder:font-medium text-black font-medium bg-slate-100 rounded-3xl focus:placeholder:text-slate-400 focus:font-medium outline-red-400"
        }
      />
    </>
  );
};

export default forwardRef(TitleInput);
