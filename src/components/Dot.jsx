function Dot({ active, idx, setSlideIdx }) {
  const moveDot = (index) => {
    setSlideIdx(index);
  };

  return (
    <>
      <div
        onClick={() => moveDot(idx + 1)}
        className={`w-2 h-2 m-2 rounded-full shadow-sm cursor-pointer ${
          active ? "bg-black" : "bg-slate-400"
        }`}
      ></div>
    </>
  );
}

export default Dot;
