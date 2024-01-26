import { useState, useRef, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import StringCombinator from "../../../utils/Combinator/StringCombinator";

export default function PhotoZone() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const fileInputRef = useRef();

  const { data: photos = [], isLoading: isPhotosLoading } = useGetPhotos();
  const [a, setA] = useState([]);
  const [b, setB] = useState([]);
  useEffect(() => {
    if (photos.length !== 0) {
      const halfIndex = parseInt(photos.length / 2);
      const aSlice = photos.slice(0, halfIndex);
      const bSlice = photos.slice(halfIndex, photos.length);
      setA(aSlice);
      setB(bSlice);
    }
  }, [photos]);

  const { mutate: createPhoto, isPending: isPhotoPending } = usePostPhoto();

  // 폼 제출
  const handlePhotoCreate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    createPhoto(formData);
  };

  return (
    <section className="photoZone w-full h-fit my-10">
      <div className="header flex flex-row justify-between items-end mr-6 mb-8 px-16">
        <h3 className="mainTitle text-[2.5rem] font-semibold text-gray-700 mx-4 mr-6">
          포토존
        </h3>
        {/* 사진 업로드하는 폼 */}
        <form
          encType="multipart/form-data"
          onClick={() => {
            fileInputRef.current.value = null;
            fileInputRef.current.click();
          }}
          onSubmit={handlePhotoCreate}
          className="h-fit"
        >
          <input
            disabled={isPhotoPending}
            ref={fileInputRef}
            className=" hidden w-full h-full"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={({ target: { files } }) => {
              if (files[0]) {
                setFileName(files[0].name);
                setFile(files[0]);
              }
            }}
          />
          <div
            className={`${
              file ? "bg-home-primary" : "white"
            } flex flex-row justify-evenly items-center w-fit h-[2rem] p-2 pt-[0.6rem] 
            font-semibold text-home-primary border-2 border-home-primary rounded-xl shadow-md hover:cursor-pointer`}
          >
            {file ? (
              <>
                <span className="mx-2 text-white">{fileName}</span>
                <MdOutlineCancel
                  size={18}
                  className="text-white bg-home-primary"
                  onClick={(event) => {
                    event.stopPropagation();
                    setFileName(null);
                    setFile(null);
                  }}
                />
              </>
            ) : (
              <>
                <FaCloudUploadAlt size={18} className="mr-1" />
                <span className="text-sm">사진 올리기</span>
              </>
            )}
          </div>
          {file ? (
            <button
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-3 bg-home-primary"
            >
              올리기
            </button>
          ) : null}
        </form>
      </div>
      {/* 슬라이딩 이미지 */}
      <div className="animationList inline-block w-[500rem] animate-infiniteslide hover:[animation-play-state:paused]">
        <div className="imgList inline-block w-[250rem]">
          {a
            ? a.map((photo) => (
                <div className="cell w-[25rem] inline-block h-fit px-1">
                  <img
                    className="shadow-md rounded-sm brightness-98"
                    src={StringCombinator.getImagePath(photo)}
                    alt={"포토존 사진"}
                  />
                </div>
              ))
            : null}
        </div>
        <div className="imgList inline-block w-[250rem]">
          {b
            ? b.map((photo) => (
                <div className="cell w-[25rem] inline-block h-fit px-1">
                  <img
                    className="shadow-md rounded-sm brightness-98"
                    src={StringCombinator.getImagePath(photo)}
                    alt={"포토존 사진"}
                  />
                </div>
              ))
            : null}
        </div>
      </div>

      {/* <div className="animationList inline-block w-[300rem] animate-infiniteslide hover:[animation-play-state:paused]">
        <div className="imgList inline-block w-[150rem]">
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b2.jpg"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b3.jpg"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b4.png"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b5.png"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b1.png"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b2.jpg"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b3.jpg"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b4.png"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b5.png"
            ></img>
          </div>
        </div>
        <div className="imgList inline-block w-[150rem]">
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b1.png"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b2.jpg"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b3.jpg"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b4.png"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b5.png"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b1.png"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b2.jpg"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b3.jpg"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b4.png"
            ></img>
          </div>
          <div className="cell w-[15rem] inline-block h-fit px-1">
            <img
              className="shadow-md rounded-sm brightness-98"
              src="assets/b5.png"
            ></img>
          </div>
        </div>
      </div> */}
    </section>
  );
}

// REST: 포토존 사진 조회
const useGetPhotos = () => {
  return useQuery({
    queryKey: ["photo-zone"],
    queryFn: async () => {
      const photoZoneURL = `${process.env.REACT_APP_SERVER}/life4cut?size=20`;

      // TEST: json-server
      // const photoZoneURL = `${process.env.REACT_APP_SERVER}/`;
      return await axios.get(photoZoneURL).then((res) => {
        return res.data.response.dtoList;
      });
    },
  });
};

// REST: 사진 등록
function usePostPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileFormData) => {
      console.log(fileFormData);
      const photoZoneURL = `${process.env.REACT_APP_SERVER}/life4cut/save`;
      return await axios.post(photoZoneURL, fileFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    // 클라이언트 업데이트
    onSuccess: () => {
      queryClient.invalidateQueries(["photo-zone"]);
    },
  });
}
