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
    <section className="photoZone relative bg-white w-full h-screen overflow-hidden">
      <div className="uploadArea absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="text-home-primary text-4xl ml-4 mb-4 font-semibold">
          포토존
        </div>
        {/* 사진 업로드하는 폼 */}
        <form
          className="w-36 h-32 mt-6 flex-col justify-center items-center border-2 border-dashed border-red-500 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => {
            document.querySelector(".inputField").click();
          }}
        >
          <input
            className="inputField hidden w-full h-full"
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
              <img src={image} className="w-full h-full" alt={fileName} />
              <MdDelete
                size={25}
                className="absolute right-4 bottom-4 text-home-secondary "
                onClick={(event) => {
                  event.stopPropagation();
                  setFileName("No selected file");
                  setImage(null);
                }}
              />
            </>
          ) : (
            <>
              <FaCloudUploadAlt
                size={60}
                className="absolute top-32 left-1/2 -translate-x-1/2 -translate-y-1/2 text-home-primary m-auto ease-in-out duration-200 hover:scale-110"
              />
            </>
          )}
        </form>
      </div>
    </section>
  );
}
