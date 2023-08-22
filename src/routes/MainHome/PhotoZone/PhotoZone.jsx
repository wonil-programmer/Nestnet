import axios from "axios";
import { useCallback } from "react";
import { useRef } from "react";

export default function PhotoZone() {
  const inputRef = useRef(null);

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

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <section class="photoZone relative bg-white w-screen h-screen">
      <div class="absolute top-48 left-64">
        <div class="text-home-primary text-4xl mb-4 font-semibold">포토존</div>
        <div>우리의 일상의 이야기를 들려주세요.</div>
      </div>
      <input
        class="hidden"
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onUploadImage}
      />
      <button
        class="border rounded"
        // label="이미지 업로드"
        onClick={onUploadImageButtonClick}
      >
        이미지 업로드
      </button>
    </section>
  );
}
