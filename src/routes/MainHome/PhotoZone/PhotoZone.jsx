import axios from "axios";
import { useCallback, useState } from "react";
import { useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiFillFile } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

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

  return (
    <section class="photoZone relative bg-white w-full h-screen">
      <div class="absolute top-48 left-64">
        <div class="text-home-primary text-4xl mb-4 font-semibold">포토존</div>
        <div>우리의 일상의 이야기를 들려주세요.</div>
        {/* 사진 업로드하는 폼 */}
        <form
          class="w-72 h-72 mt-6 flex-col justify-center border-2 border-dashed border-red-500 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => {
            document.querySelector(".inputField").click();
          }}
        >
          <input
            class="inputField hidden"
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
            <img src={image} class="w-full h-full" alt={fileName} />
          ) : (
            <>
              <FaCloudUploadAlt color="text-red-600" size={50} />
              <p>사진 찾아보기</p>
            </>
          )}
        </form>
        <section class="uploaded-row">
          <AiFillFile color="text-black" />
          <span class="upload-content">
            {fileName} -
            <MdDelete
              onClick={() => {
                setFileName("No selected file");
                setImage(null);
              }}
            />
          </span>
        </section>
      </div>
    </section>
  );
}
