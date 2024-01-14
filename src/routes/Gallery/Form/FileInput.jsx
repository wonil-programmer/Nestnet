import { useRef, memo } from "react";
import { MdUpload } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { AiFillFileImage } from "react-icons/ai";
import StringCombinator from "../../../utils/Combinator/StringCombinator";

/**
 * 앨범 사진 파일 추가 input
 * @param {}
 * @returns
 */
const FileInput = ({ fileInformation, onFileInfoChange, onFileDelete }) => {
  const fileInputRef = useRef(null);

  return (
    <>
      <div className={"w-1/2 flex flex-col items-center"}>
        <input
          type={"file"}
          ref={fileInputRef}
          className={"hidden"}
          onChange={onFileInfoChange}
          accept=".gif, .jpg, .jpeg, .png"
          multiple={true}
        />
        <div
          className={
            "filesContainer w-full h-[90%] overflow-y-auto whitespace-nowrap"
          }
        >
          {fileInformation.length === 0 ? (
            <div
              className={
                "w-full h-full flex flex-col items-center justify-center bg-slate-200 border-2 border-stone-600 border-dotted rounded-2xl"
              }
            >
              <AiFillFileImage className={"w-10 h-10 mb-2"} />
              <span>업로드 버튼을 클릭하여 사진을 추가하세요.</span>
            </div>
          ) : (
            <>
              {fileInformation.map((fileInfo) => (
                <div
                  key={fileInfo.id}
                  className={
                    "relative flex flex-col w-full my-2 aspect-auto bg-gray-100 rounded-xl brightness-95 shadow-md overflow-hidden"
                  }
                >
                  {/* 기존 사진 파일인 경우와 새로 업로드하는 파일 src 구분 */}
                  {"originalFileName" in fileInfo ? (
                    <img
                      className="object-scale-down object-center"
                      src={StringCombinator.getImagePath(fileInfo)}
                      alt="기존사진"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(fileInfo.photoFile)}
                      alt="업로드된 사진"
                    />
                  )}
                  <button
                    type={"button"}
                    onClick={() => {
                      fileInputRef.current.value = null;
                      onFileDelete(fileInfo.id);
                    }}
                    className={
                      "absolute w-8 h-8 bg-white bottom-3 right-3 rounded-full duration-300"
                    }
                  >
                    <FaTrash className={"w-4 h-4 mx-auto"} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        <button
          type={"button"}
          onClick={() => fileInputRef.current.click()}
          className={
            "addFileBtn w-[3rem] h-[3rem] mt-6 bg-gray-400 text-white rounded-full overflow-hidden shadow-md hover:bg-gray-500 transition-all"
          }
        >
          <MdUpload className={"w-full h-full p-2"} />
        </button>
      </div>
    </>
  );
};
export default memo(FileInput);
