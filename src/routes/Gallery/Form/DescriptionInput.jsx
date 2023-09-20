import { forwardRef } from "react";

const DescriptionInput = ({ description, onDescriptionChange }, ref) => {
  return (
    <>
      <input
        id={"descriptionInput"}
        type={"text"}
        minLength={4}
        maxLength={20}
        value={description}
        placeholder={"사진들에 대한 상세 설명을 작성하세요."}
        onChange={onDescriptionChange}
        className={
          "description placeholder:text-stone-500 font-semibold bg-slate-200 pl-6 py-3 rounded-3xl focus:placeholder:text-slate-400 focus:font-medium"
        }
        autoComplete={"off"}
        ref={ref}
      />
    </>
  );
};

export default forwardRef(DescriptionInput);
