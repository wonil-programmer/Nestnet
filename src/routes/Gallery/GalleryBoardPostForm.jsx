import axios from "axios";
import Header from "../../components/Header";
import TitleInput from "./Form/TitleInput";
import DescriptionInput from "./Form/DescriptionInput";
import FileInput from "./Form/FileInput";
import BoardPostButton from "./Form/BoardPostButton";
import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useLocation, useParams } from "react-router-dom";

/**
 * 앨범 작성 폼
 * @param {isModifying} isModifying: 수정 중 여부에 대한 prop
 * @returns
 */
const GalleryBoardPostForm = ({ isModifying }) => {
  // 수정시 게시물 postId, Id List(기존 파일들의 아이디만 포함) 필요
  const { postId } = useParams();
  const [existingPhotoIds, setExistingPhotoIds] = useState([]);

  const location = useLocation();
  const [photoFileList, setPhotoFileList] = useState([]);
  const [title, setTitle] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [isPostBtnDisabled, setIsPostBtnDisabled] = useState(true);

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  // 게시물 제목 작성
  const handleTitleChange = () => {
    let titleInputValue = titleInputRef.current.value;
    setTitle(titleInputValue);
  };

  // 게시물 본문 작성
  const handleBodyContentChange = () => {
    let bodyContentInput = descriptionInputRef.current.value;
    setBodyContent(bodyContentInput);
  };

  // 첨부 파일 추가
  const handleFileInfoChange = (event) => {
    let photoFiles = event.target.files;
    setPhotoFileList([
      ...photoFileList,
      ...Array.from(photoFiles).map((photoFile) => ({
        id: v4(),
        photoFile,
      })),
    ]);
  };

  // 첨부 파일 삭제
  const handleFileDelete = (targetFileId) => {
    // 수정시 사진 Id 리스트 조작 (기존 아이디)
    if (isModifying) {
      existingPhotoIds.splice(
        existingPhotoIds.findIndex((file) => file.id === targetFileId),
        1
      );
    }
    photoFileList.splice(
      photoFileList.findIndex((photoFile) => photoFile.id === targetFileId),
      1
    );
  };

  // 폼 제출
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (isModifying) {
      // const photoIdArr = new Blob([JSON.stringify(existingPhotoIds)], {
      //   type: "application/json",
      // });
      const photoIdArr = JSON.stringify(existingPhotoIds);
      formData.append("file-id", photoIdArr);
    }

    const blob = new Blob([JSON.stringify(photoFileList)], {
      type: "application/json",
    });
    formData.append("photo-file", blob);
    formData.append("data", title);
    formData.append("data", bodyContent);

    photoFileList.forEach((photoFileList) =>
      formData.append("photo-file", photoFileList.file)
    );

    if (isModifying) {
      axios
        ?.post(
          `${process.env.REACT_APP_SERVER}/photo-post/modify/${postId}`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        ?.then((response) => console.log(response))
        ?.catch(() => console.log("modify fail"));
    } else {
      axios
        ?.post(`${process.env.REACT_APP_SERVER}/photo-post/post`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        ?.then((response) => console.log(response))
        ?.catch(() => console.log("post fail"));
    }
  };

  useEffect(() => {
    setIsPostBtnDisabled(
      photoFileList?.length === 0 ||
        title?.trim().length === 0 ||
        bodyContent?.trim().length === 0
    );
  }, [isPostBtnDisabled]);

  /**
   * 앨범 수정시 기존 사진 파일 정보를 photoFileList state에 주입
   */
  useEffect(() => {
    if (isModifying) {
      let {
        photoInfo: existingPhotos,
        title: prevTitle,
        bodyContent: prevBodyContent,
      } = location.state.metaData;

      setPhotoFileList(existingPhotos);
      setTitle(prevTitle);
      setBodyContent(prevBodyContent);
      let existingIds = existingPhotos.map((photo) => photo.id);
      setExistingPhotoIds(existingIds);
    }
  }, [location.state.metaData, isModifying]);

  return (
    <div className={"min-h-screen bg-home-background"}>
      <Header />
      <div className={"fixed w-full h-[calc(100vh-4.6rem)] top-[4.6rem]"}>
        <div className={"h-full border-4 border-transparent overflow-auto"}>
          <div className={"h-full py-4 flex justify-center"}>
            <div className={"py-11"}>
              <div
                className={
                  "formWrapper w-[36rem] px-10 py-8 rounded-3xl bg-white"
                }
              >
                <form
                  onSubmit={handleFormSubmit}
                  enctype="multipart/form-data"
                  className={"flex flex-col"}
                >
                  <div className={"flex flex-col justify-between"}>
                    <div className={"my-6"}>
                      <FileInput
                        fileInformation={photoFileList}
                        onFileInfoChange={handleFileInfoChange}
                        onFileDelete={handleFileDelete}
                        isModifying={isModifying}
                      />
                    </div>
                    <div className={"flex flex-col mb-[0.15rem]"}>
                      <TitleInput
                        title={title}
                        onTitleChange={handleTitleChange}
                        ref={titleInputRef}
                      />
                    </div>
                    <div className={"flex flex-col mb-6"}>
                      <DescriptionInput
                        bodyContent={bodyContent}
                        onDescriptionChange={handleBodyContentChange}
                        ref={descriptionInputRef}
                      />
                    </div>
                  </div>
                  <div className={"flex justify-end"}>
                    <BoardPostButton
                      isPostBtnDisabled={isPostBtnDisabled}
                      isModifying={isModifying}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GalleryBoardPostForm.defaultProps = {
  isModifying: false,
};

export default GalleryBoardPostForm;
