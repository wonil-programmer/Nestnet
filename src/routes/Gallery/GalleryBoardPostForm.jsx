import axios from "axios";
import Header from "../../components/Header";
import TitleInput from "./Form/TitleInput";
import DescriptionInput from "./Form/DescriptionInput";
import FileInput from "./Form/FileInput";
import BoardPostButton from "./Form/BoardPostButton";
import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import {
  setFileInfo,
  deleteFile,
  setTitle,
  setDescription,
} from "./Form/formReducer";
import { useDispatch, useSelector } from "react-redux";

const GalleryBoardPostForm = () => {
  const [isPostBtnDisabled, setIsPostBtnDisabled] = useState(true);

  const formStates = useSelector((state) => state.form);
  const formDispatch = useDispatch();

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  // 게시물 제목
  const handleTitleChange = () => {
    let titleInputValue = titleInputRef.current.value;
    formDispatch(setTitle(titleInputValue));
  };

  // 게시물 본문
  const handleBodyContentChange = () => {
    let bodyContentInput = descriptionInputRef.current.value;
    formDispatch(setDescription(bodyContentInput));
  };

  // 첨부 파일 추가
  const handleFileInfoChange = (event) => {
    formDispatch(
      setFileInfo(
        Array.from(event.target.files).map((file) => ({ id: v4(), file }))
      )
    );
  };

  // 첨부 파일 삭제
  const handleFileDelete = (targetFileId) => {
    formDispatch(deleteFile(targetFileId));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(formStates)], {
      type: "application/json",
    });
    console.log(blob);

    formData.append("data", blob);
    formStates.fileInfo.forEach((fileInfo) =>
      formData.append("photo-file", fileInfo.file)
    );

    axios
      ?.post("http://172.20.10.8:8080/photo-post/post", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      ?.then((response) => console.log(response))
      ?.catch(() => console.log("post fail"));
  };

  useEffect(() => {
    const { fileInfo, title, bodyContent } = formStates;
    console.log(fileInfo, title, bodyContent);
    setIsPostBtnDisabled(
      fileInfo?.length === 0 ||
        title?.trim().length === 0 ||
        bodyContent?.trim().length === 0
    );
  }, [isPostBtnDisabled, formStates]);

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
                <form onSubmit={handleFormSubmit} className={"flex flex-col"}>
                  <div className={"flex flex-col justify-between"}>
                    <div className={"my-6"}>
                      <FileInput
                        fileInformation={formStates.fileInfo}
                        onFileInfoChange={handleFileInfoChange}
                        onFileDelete={handleFileDelete}
                      />
                    </div>
                    <div className={"flex flex-col mb-[0.15rem]"}>
                      <TitleInput
                        title={formStates.title}
                        onTitleChange={handleTitleChange}
                        ref={titleInputRef}
                      />
                    </div>
                    <div className={"flex flex-col mb-6"}>
                      <DescriptionInput
                        bodyContent={formStates.bodyContent}
                        onDescriptionChange={handleBodyContentChange}
                        ref={descriptionInputRef}
                      />
                    </div>
                  </div>
                  <div className={"flex justify-end"}>
                    <BoardPostButton isPostBtnDisabled={isPostBtnDisabled} />
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

export default GalleryBoardPostForm;
