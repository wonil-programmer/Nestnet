import axios from "axios";
import { useCallback, useState } from "react";
import { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiFillFile } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Masonry from "react-masonry-css";
import { Flex } from "@chakra-ui/react";

export default function PhotoZone() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  const onUploadImage = useCallback((e) => {
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

  const breakpointColumnsObj = {
    default: 6,
    1200: 5,
    1000: 4,
    800: 3,
  };

  return (
    <section class="photoZone relative bg-white w-full h-screen overflow-hidden">
      <div class="w-5/6 float-right opacity-90 rotate-6">
        <Flex as={Masonry} breakpointCols={breakpointColumnsObj}>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img
              src={`${process.env.PUBLIC_URL}/assets/b1.png`}
              class="w-48 hover:scale-125 hover:-rotate-6"
            />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b2.jpg`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b3.jpg`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b4.png`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b5.png`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b2.jpg`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b5.png`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b3.jpg`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b1.png`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b4.png`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b1.png`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b4.png`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b5.png`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b3.jpg`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b3.jpg`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b1.png`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b1.png`} class="w-48" />
          </div>
          <div class="relative w-48 mt-2 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <img src={`${process.env.PUBLIC_URL}/assets/b4.png`} class="w-48" />
          </div>
        </Flex>
      </div>
      <div class="uploadArea absolute top-32 left-16">
        <div class="text-home-primary text-4xl ml-4 mb-4 font-semibold">
          포토존
        </div>
        {/* 사진 업로드하는 폼 */}
        <form
          class="w-36 h-32 mt-6 flex-col justify-center items-center border-2 border-dashed border-red-500 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => {
            document.querySelector(".inputField").click();
          }}
        >
          <input
            class="inputField hidden w-full h-full"
            type="file"
            accept="image/*"
            onChange={({ target: { files } }) => {
              if (files[0]) {
                setFileName(files[0].name);
                if (image) {
                  // 이전에 생성한 객체 URL 해제
                  URL.revokeObjectURL(image);
                }
                // 새로운 객체 URL 생성
                setImage(URL.createObjectURL(files[0]));
              }
            }}
          />
          {image ? (
            <>
              <img src={image} class="w-full h-full" alt={fileName} />
              <MdDelete
                size={25}
                class="absolute right-4 bottom-4 text-home-secondary "
                onClick={() => {
                  setFileName("No selected file");
                  setImage(null);
                }}
              />
            </>
          ) : (
            <>
              <FaCloudUploadAlt
                size={60}
                class="absolute top-32 left-1/2 -translate-x-1/2 -translate-y-1/2 text-home-primary m-auto ease-in-out duration-200 hover:scale-110"
              />
            </>
          )}
        </form>
      </div>
    </section>
  );
}
