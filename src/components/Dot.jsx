function Dot({ active, idx, setSlideIdx }) {
  const moveDot = (index) => {
    setSlideIdx(index);
  };

  return (
    <>
      <div
        onClick={() => moveDot(idx)}
        className={`w-2 h-2 m-2 rounded-full shadow-sm cursor-pointer ${
          active ? "bg-home-primary" : "bg-slate-200"
        }`}
      ></div>
    </>
  );
}

export default Dot;
