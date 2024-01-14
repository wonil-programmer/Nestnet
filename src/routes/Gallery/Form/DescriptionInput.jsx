import { forwardRef } from "react";

const DescriptionInput = ({ bodyContent, onDescriptionChange }, ref) => {
  return (
    <>
      <textarea
        id={"descriptionInput"}
        type={"text"}
        minLength={4}
        maxLength={65}
        value={bodyContent}
        placeholder={"사진들에 대한 상세 설명을 작성하세요."}
        onChange={onDescriptionChange}
        className={
          "description w-full h-[6rem] mb-2 px-6 py-3 placeholder:text-stone-500 placeholder:font-medium text-black font-medium bg-slate-100 rounded-3xl focus:placeholder:text-slate-400 focus:font-medium outline-red-400"
        }
        autoComplete={"off"}
        ref={ref}
      />
    </>
  );
};

export default forwardRef(DescriptionInput);
