const CircleButton = ({ onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="flex flex-col items-center box-content p-1 w-[2.3rem] h-[2.3rem] rounded-full hover:bg-gray-200 hover:scale-105 duration-300"
      ></button>
    </>
  );
};

export default CircleButton;
