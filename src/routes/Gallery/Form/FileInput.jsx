import { useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

const FileInput = ({
  fileInformation,
  onFileInformationChange,
  onFileDelete,
}) => {
  const inputFileRef = useRef(null);

  return (
    <div className={"my-7"}>
      <span className={"mx-2 text-lg font-bold mb-2 block"}>
        아래 버튼을 클릭하여 사진 업로드
      </span>
      <div className={"flex items-center"}>
        <input
          type={"file"}
          className={"hidden"}
          ref={inputFileRef}
          onChange={onFileInformationChange}
          multiple={true}
        />
        <button
          type={"button"}
          onClick={() => inputFileRef.current.click()}
          className={
            "mr-1 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:scale-105 duration-300"
          }
        >
          <MdOutlineFileUpload className={"w-10 h-10"} />
        </button>
        <div
          className={
            "flex-grow flex overflow-scroll whitespace-nowrap fileShowing"
          }
        >
          {fileInformation.length === 0 ? (
            <p className={"ml-3 font-semibold text-gray-700"}>
              첨부 파일이 없습니다.
            </p>
          ) : (
            <>
              {fileInformation.map((fileInfo) => {
                return (
                  <div
                    key={fileInfo.id}
                    className={
                      "w-fit mx-1 px-3 py-2 bg-gray-100 rounded-3xl flex"
                    }
                  >
                    <span>{fileInfo.file.name}</span>
                    <button
                      type={"button"}
                      onClick={() => {
                        inputFileRef.current.value = null;
                        onFileDelete(fileInfo);
                      }}
                      className={"ml-1.5 hover:scale-125 duration-300"}
                    >
                      <IoCloseOutline className={"w-6 h-6"} />
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default FileInput;
