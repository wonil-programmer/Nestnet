import { useEffect, useState } from "react";
import { useImageSize } from "react-image-size";

export default function MainPhoto({ mainImage }) {
  const imgPath = `${process.env.PUBLIC_URL}/assets/${mainImage}`;
  const [resize, setResize] = useState(false);
  const [dimensions, { isLoading, error }] = useImageSize(imgPath);
  const visualContentHeight = 760;
  const visualContentRatio = 1.3;
  // 기존 이미지의 높이가 760px((Album.jsx의 visualContent의 높이)보다 크고,
  // 종횡비(너비/폭)가 1.3(Album.jsx의 visualContent의 종횡비(올림))보다 작은 경우 리사이징
  useEffect(() => {
    dimensions?.height > visualContentHeight &&
    dimensions?.width / dimensions?.height < visualContentRatio
      ? setResize(true)
      : setResize(false);
  }, [dimensions]);

  return (
    <>
      {isLoading ? (
        <div className="w-11 h-11 bg-slate-400"></div>
      ) : (
        <img
          className={`${
            resize ? "w-2/5" : "w-4/5"
          } rounded-3xl m-auto my-6 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]`}
          src={imgPath}
          alt="img__main"
        />
      )}
    </>
  );
}
