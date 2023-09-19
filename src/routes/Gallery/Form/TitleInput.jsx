import { forwardRef } from "react";

const TitleInput = ({ title, onTitleChange }, ref) => {
  return (
    <div>
      <label htmlFor="titleInput">제목</label>
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
        className={"title"}
      />
    </div>
  );
};

export default forwardRef(TitleInput);
