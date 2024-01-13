const CircleButton = ({ onClick, content, disabled = false }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="flex flex-col items-center box-content p-2 w-[2.3rem] h-[2.3rem] rounded-full bg-gray-200 hover:bg-gray-300 duration-300"
        disabled={disabled}
      >
        {content}
      </button>
    </>
  );
};

export { CircleButton };
