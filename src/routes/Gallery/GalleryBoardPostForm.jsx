import axios from "axios";
import Header from "../../components/Header";
import TitleInput from "./Form/TitleInput";
import DescriptionInput from "./Form/DescriptionInput";
import FileInput from "./Form/FileInput";
import BoardPostButton from "./Form/BoardPostButton";
import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useReducer } from "react";

const GalleryBoardPostForm = () => {
  const [isPostBtnDisabled, setIsPostBtnDisabled] = useState(true);

  const formReducer = (state, action) => {
    switch (action.type) {
      case "SET_FILEINFO":
        return { ...state, fileInfo: action.payload };
      case "FILE_DELETE":
        return {
          ...state,
          fileInfo: action.payload,
        };
      case "SET_TITLE_INPUT":
        return { ...state, title: action.payload };
      case "SET_DESCRIPTION_INPUT":
        return { ...state, description: action.payload };
      default:
        return state;
    }
  };
  const initialFormState = {
    fileInfo: [],
    title: "",
    description: "",
    isPostBtnDisabled: true,
  };
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const handleTitleChange = () => {
    let titleInputData = titleInputRef.current.value;
    dispatch({ type: "SET_TITLE_INPUT", payload: titleInputData });
    // const key = event.target.id.replace("Input", "");
    // const value = event.target.value;
    // setFormValues({ ...formValues, [key]: value });
  };

  const handleDescriptionChange = () => {
    // setFormValues({ ...formValues, description: event.target.value });
    let descriptionInputData = descriptionInputRef.current.value;
    dispatch({ type: "SET_DESCRIPTION_INPUT", payload: descriptionInputData });
  };

  const handleFileInfoChange = (event) => {
    dispatch({
      type: "SET_FILEINFO",
      payload: [
        ...formState.fileInfo,
        ...Array.from(event.target.files).map((file) => ({ id: v4(), file })),
      ],
    });
  };

  const handleFileDelete = (targetFileInfo) => {
    dispatch({
      type: "FILE_DELETE",
      payload: formState.fileInfo.filter(
        (fileInfo) => fileInfo?.id !== targetFileInfo?.id
      ),
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    // const blob = new Blob([JSON.stringify(formState)], {
    //   type: "application/json",
    // });

    // formData.append("data", blob);
    formState.fileInfo.forEach((fileInfo) =>
      formData.append("src", fileInfo.file.name)
    );

    axios
      ?.post("http://localhost:3002/album1", formData, {
        headers: { "Content-Type": "application/json" },
      })
      ?.then((response) => console.log(response))
      ?.catch(() => console.log("post fail"));
  };

  useEffect(() => {
    const { fileInfo, title, description } = formState;
    setIsPostBtnDisabled(
      fileInfo.length === 0 ||
        title.trim().length === 0 ||
        description.trim().length === 0
    );
  }, [isPostBtnDisabled, formState]);

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
                        fileInformation={formState.fileInfo}
                        onFileInfoChange={handleFileInfoChange}
                        onFileDelete={handleFileDelete}
                      />
                    </div>
                    <div className={"flex flex-col mb-[0.15rem]"}>
                      <TitleInput
                        title={formState.title}
                        onTitleChange={handleTitleChange}
                        ref={titleInputRef}
                      />
                    </div>
                    <div className={"flex flex-col mb-6"}>
                      <DescriptionInput
                        description={formState.description}
                        onDescriptionChange={handleDescriptionChange}
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
