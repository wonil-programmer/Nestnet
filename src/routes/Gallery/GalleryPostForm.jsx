import axios from "axios";
import TitleInput from "./Form/TitleInput";
import DescriptionInput from "./Form/DescriptionInput";
import FileInput from "./Form/FileInput";
import BoardPostButton from "./Form/BoardPostButton";
import { ORIGINAL_FILE_FLAG } from "../../constant/Constant";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

/**
 * 앨범 작성 폼
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

    // REST: 수정시
    if (isModifying) {
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
        // 기존 사진이 아닌 경우에만 전송할 파일 리스트에 추가
        if (!fileItem.hasOwnProperty(ORIGINAL_FILE_FLAG)) {
          formData.append("file", fileItem.photoFile);
        }
      });

      axios
        ?.post(`${process.env.REACT_APP_SERVER}/photo-post/modify`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        ?.then((response) => navigate(`/gallery`))
        ?.catch(() => {
          alert("게시물 수정에 실패하였습니다.");
          navigate(`/gallery`);
        });
    }

    // REST: 수정 아닌 작성시
    if (!isModifying) {
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

      axios
        ?.post(`${process.env.REACT_APP_SERVER}/photo-post/post`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        ?.then((response) => navigate("/gallery"))
        ?.catch(() => {
          alert("게시물 등록에 실패하였습니다.");
          navigate(`/gallery`);
        });
    }
  };

  // 저장/수정 버튼 활성화 여부 판단
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
