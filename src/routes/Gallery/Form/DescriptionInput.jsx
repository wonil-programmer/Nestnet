import { forwardRef } from "react";

const DescriptionInput = ({ description, onDescriptionChange }, ref) => {
  return (
    <div>
      <label htmlFor="descriptionInput">설명</label>
      <input
        id={"descriptionInput"}
        type={"text"}
        minLength={4}
        maxLength={20}
        value={description}
        placeholder={"사진들에 대한 상세 설명을 작성하세요."}
        onChange={onDescriptionChange}
        className={"description"}
        autoComplete={"off"}
        ref={ref}
      />
    </div>
  );
};

export default forwardRef(DescriptionInput);
