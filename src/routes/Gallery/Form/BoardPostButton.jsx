const BoardPostButton = ({ isPostBtnDisabled, isModifying }) => {
  return (
    <button
      type={isPostBtnDisabled ? "button" : "submit"}
      className={`px-4 py-3 bg-red-500 text-white text-lg font-bold rounded-3xl ${
        isPostBtnDisabled
          ? "cursor-default opacity-75"
          : "opacity-100 hover:scale-105"
      } duration-200`}
    >
      {isModifying ? "수정" : "저장"}
    </button>
  );
};

export default BoardPostButton;
