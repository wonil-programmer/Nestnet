const BoardPostButton = ({ isPostBtnDisabled }) => {
  return (
    <button
      type={isPostBtnDisabled ? "button" : "submit"}
      className={`px-4 py-3 bg-blue-500 text-white text-lg font-bold rounded-3xl ${
        isPostBtnDisabled
          ? "cursor-default opacity-75"
          : "opacity-100 hover:scale-110"
      } duration-300`}
    >
      저장
    </button>
  );
};

export default BoardPostButton;
