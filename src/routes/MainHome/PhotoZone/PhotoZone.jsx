import axios from "axios";
import { useCallback, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiFillFile } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FcStackOfPhotos } from "react-icons/fc";

export default function PhotoZone() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  const onUploadImage = useCallback((e) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    axios({
      url: `http://localhost:3003/photos`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="photoZone w-full h-fit my-10">
      <div className="mainTitle flex flex-row items-center mb-8 px-16">
        <span className="text-6xl">
          <FcStackOfPhotos />
        </span>
        <h3 className="text-[2.5rem] font-semibold text-gray-700 mx-4 mr-6 mb-4">
          포토존
        </h3>
      </div>
      {/* 슬라이딩 이미지 */}
      <div className="animationList inline-block w-[300rem] animate-infiniteslide hover:[animation-play-state:paused]">
        <div className="imgList inline-block w-[150rem]">
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b1.png"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b2.jpg"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b3.jpg"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b4.png"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b5.png"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b1.png"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b2.jpg"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b3.jpg"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b4.png"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b5.png"></img>
          </div>
        </div>
        <div className="imgList inline-block w-[150rem]">
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b1.png"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b2.jpg"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b3.jpg"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b4.png"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b5.png"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b1.png"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b2.jpg"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b3.jpg"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b4.png"></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img src="assets/b5.png"></img>
          </div>
        </div>
      </div>
    </section>
  );
}
