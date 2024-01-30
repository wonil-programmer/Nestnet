import { useState, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { TbCameraSelfie } from "react-icons/tb";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import StringCombinator from "../../../utils/Combinator/StringCombinator";

export default function PhotoZone({ inView }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const fileInputRef = useRef();

  const { data: photos = [], isLoading: isPhotosLoading } =
    useGetPhotos(inView);

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
      <div className="header flex flex-row justify-end items-end mr-6 mb-8 px-16">
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
          <div className="flex flex-row h-fit">
            <div
              className={`${
                file ? "bg-home-primary" : "white"
              } flex flex-row justify-evenly items-center w-fit p-[0.7rem]
            font-semibold text-home-primary border-2 border-home-primary rounded-lg shadow-md hover:cursor-pointer`}
            >
              {file ? (
                <>
                  <span className="w-fit max-w-[20rem] mx-1 text-white truncate">
                    {fileName}
                  </span>
                </>
              ) : (
                <>
                  <TbCameraSelfie size={24} />
                </>
              )}
            </div>
            {file ? (
              <>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-fit px-2 bg-white border-2 border-home-primary text-home-primary rounded-lg"
                >
                  <FaCloudUploadAlt size={20} className="" />
                </button>
                <button
                  className="w-fit px-2 bg-home-primary text-white rounded-lg"
                  onClick={(event) => {
                    event.stopPropagation();
                    setFileName(null);
                    setFile(null);
                  }}
                >
                  <MdOutlineCancel size={18} />
                </button>
              </>
            ) : null}
          </div>
        </form>
      </div>
      {/* 슬라이딩 이미지 */}
      <div className="animationList flex flex-row w-[1000rem] animate-infiniteslide hover:[animation-play-state:paused]">
        {photos.length === 0
          ? null
          : [...Array(2)].map((_, index) => (
              <div
                key={index}
                className="imgList flex flex-row items-center w-[500rem]"
              >
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="cell w-[50rem] inline-block h-fit px-2"
                  >
                    <img
                      className="shadow-md rounded-sm brightness-98"
                      src={StringCombinator.getImagePath(photo)}
                      alt={"포토존 사진"}
                    />
                  </div>
                ))}
              </div>
            ))}
      </div>
    </section>
  );
}

// REST: 포토존 사진 조회
const useGetPhotos = (inView) => {
  return useQuery({
    queryKey: ["photo-zone"],
    queryFn: async () => {
      const photoZoneURL = `${process.env.REACT_APP_SERVER}/life4cut?size=20`;
      return await axios.get(photoZoneURL).then((res) => {
        console.log(res.data.response.dtoList);
        return res.data.response.dtoList;
      });
    },
    gcTime: 0,
    enabled: inView,
  });
};

// REST: 사진 등록
function usePostPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileFormData) => {
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
