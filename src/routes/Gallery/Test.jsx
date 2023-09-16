import axios from "axios";
import { useState, useEffect } from "react";
const Test = () => {
  const [test, setTest] = useState("");
  useEffect(() => {
    axios
      .get(
        "http://192.168.45.212:8080/file/61/8a7a1c94-78c9-4815-9fa5-1d884a1b75e2_사진게시판샘플2.jpg",
        { responseType: "blob" }
      )
      .then((response) => setTest(response.data));
  }, []);

  if (test) {
    console.log(test);
    const blob = new Blob([test], { type: "application/octet-stream" });
    // const blob = new Blob([test], { type: "image/jpg" });
    const url = window.URL.createObjectURL(blob);
    console.log(blob);
    console.log(url);

    // const $a = document.createElement("a");
    // $a.href = url;
    // $a.click();

    const $aElem = document.createElement("a");

    $aElem.download = "testfile.jpg";
    $aElem.href = url;
    // $aElem.className = "hidden";

    $aElem.click(); // 클릭해서 다운
    $aElem.remove(); // 이후 DOM 에서 제거
    // window.URL.revokeObjectURL(url);

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      console.log(reader.result);
      const $img = document.createElement("img");
      $img.src = reader.result;
      $img.width = 108;
      $img.height = 144;
      document.querySelector("body").appendChild($img);
    };

    // document.write(`<img src=${url.replace("blob:", "")}/>`);
  }
};

export default Test;

// const { id } = { id: 1 }
