import { forwardRef } from "react";

const TitleInput = ({ title, onTitleChange }, ref) => {
  return (
    <>
      <input
        id={"titleInput"}
        type={"text"}
        value={title}
        minLength={4}
        maxLength={20}
        onChange={onTitleChange}
        placeholder={"제목 추가"}
        autoComplete={"off"}
        ref={ref}
        className={
          "title placeholder:text-stone-500 font-semibold bg-slate-200 pl-6 py-3 rounded-3xl focus:placeholder:text-slate-400 focus:font-medium"
        }
      />
    </>
  );
};

export default forwardRef(TitleInput);
