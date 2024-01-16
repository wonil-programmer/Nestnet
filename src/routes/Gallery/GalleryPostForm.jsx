import axios from "axios";
import TitleInput from "./Form/TitleInput";
import DescriptionInput from "./Form/DescriptionInput";
import FileInput from "./Form/FileInput";
import BoardPostButton from "./Form/BoardPostButton";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

/**
 * 앨범 생성 폼
 * @param {boolean} isModifying
 * @returns
 */
const GalleryPostForm = ({ isModifying = false }) => {
  // 수정시 게시물 postId, Id List(기존 파일들의 아이디만 포함) 필요
  const { postId } = useParams();
  const [existingPhotoIds, setExistingPhotoIds] = useState([]);

  const location = useLocation();

  const [uploadPhotos, setUploadPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [isPostBtnDisabled, setIsPostBtnDisabled] = useState(true);

  const navigate = useNavigate();

  // 폼 제출
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (isModifying) {
      console.log(existingPhotoIds);
      console.log(uploadPhotos);

      const metaData = {
        id: postId,
        title,
        bodyContent,
      };
      const metaDataBlob = new Blob([JSON.stringify(metaData)], {
        type: "application/json",
      });
      formData.append("data", metaDataBlob);

      const existingPhotoIdsBlob = new Blob(
        [JSON.stringify(existingPhotoIds)],
        {
          type: "application/json",
        }
      );
      formData.append("file-id", existingPhotoIdsBlob);

      uploadPhotos.forEach((fileItem) => {
        if (!fileItem.hasOwnProperty("originalFileName")) {
          formData.append("file", fileItem.photoFile);
        }
      });

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      axios
        ?.post(`${process.env.REACT_APP_SERVER}/photo-post/modify`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        ?.then((response) => console.log(response))
        ?.catch(() => console.log("modify fail"));
    } else {
      const metaData = {
        title,
        bodyContent,
      };
      const metaDataBlob = new Blob([JSON.stringify(metaData)], {
        type: "application/json",
      });
      formData.append("data", metaDataBlob);
      uploadPhotos.forEach((fileItem) =>
        formData.append("file", fileItem.photoFile)
      );

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      axios
        ?.post(`${process.env.REACT_APP_SERVER}/photo-post/post`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        ?.then((response) => navigate("/gallery"))
        ?.catch(() => console.log("post fail"));
    }
  };

  // 게시 버튼 활성화 여부 판단
  useEffect(() => {
    setIsPostBtnDisabled(
      uploadPhotos?.length === 0 ||
        title?.trim().length === 0 ||
        bodyContent?.trim().length === 0
    );
  }, [isPostBtnDisabled, uploadPhotos, title, bodyContent]);

  // 수정시 기존 앨범 정보 주입
  useEffect(() => {
    if (isModifying) {
      const { title: prevTitle, bodyContent: prevBodyContent } =
        location.state.photoPostDto;
      const prevFiles = location.state.fileDtoList;
      setUploadPhotos(prevFiles);
      setTitle(prevTitle);
      setBodyContent(prevBodyContent);
      setExistingPhotoIds(prevFiles.map((file) => file.id));
    }
  }, []);

  return (
    <div className={"min-h-screen bg-home-background"}>
      <div
        className={
          "flex flex-col justify-center items-center w-full h-screen pt-[5rem]"
        }
      >
        <div
          className={`formWrapper w-3/5 h-[90%] p-10 pb-7 rounded-3xl
                   bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]`}
        >
          <form
            className="h-full"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <div className={"w-full h-full flex flex-row"}>
              <FileInput
                uploadPhotos={uploadPhotos}
                setUploadPhotos={setUploadPhotos}
                existingPhotoIds={existingPhotoIds}
                setExistingPhotoIds={setExistingPhotoIds}
                isModifying={isModifying}
              />
              <div className={"flex flex-col justify-center w-1/2 ml-8"}>
                <TitleInput title={title} setTitle={setTitle} />
                <DescriptionInput
                  bodyContent={bodyContent}
                  setBodyContent={setBodyContent}
                />
                <div className={"flex justify-end"}>
                  <BoardPostButton
                    isPostBtnDisabled={isPostBtnDisabled}
                    isModifying={isModifying}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GalleryPostForm;
