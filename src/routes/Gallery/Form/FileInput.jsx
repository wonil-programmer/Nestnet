import { useState, useEffect, useRef, memo } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { AiFillFileImage } from "react-icons/ai";

const imageRootPath = `${process.env.REACT_APP_SERVER}/image`;

/**
 * 앨범 사진 파일 추가 input
 * @param {fileInformation, onFileInfoChange, onFileDelete}
 * @returns
 */
const FileInput = ({ fileInformation, onFileInfoChange, onFileDelete }) => {
  const inputFileRef = useRef(null);

  return (
    <div className={"w-full flex flex-col items-center"}>
      <input
        type={"file"}
        className={"hidden"}
        ref={inputFileRef}
        onChange={onFileInfoChange}
        accept=".gif, .jpg, .jpeg, .png"
        multiple={true}
      />
      <div
        className={
          "filesContainer w-full h-fit overflow-x-auto whitespace-nowrap"
        }
      >
        {fileInformation.length === 0 ? (
          <div
            className={
              "w-full h-[10rem] flex flex-col items-center justify-center bg-slate-200 border-2 border-stone-600 border-dotted rounded-2xl"
            }
          >
            <AiFillFileImage className={"w-10 h-10 mb-2"} />
            <span>아래 '+' 버튼을 클릭하여 사진을 추가하세요.</span>
          </div>
        ) : (
          <>
            {fileInformation.map((fileInfo) => {
              return (
                <>
                  <div
                    key={fileInfo.id}
                    className={
                      "relative w-[12rem] mx-1 inline-block bg-gray-100 rounded-xl brightness-95 shadow-md overflow-hidden"
                    }
                  >
                    {/* 기존 사진 파일인 경우와 새로 업로드하는 파일 src 구분 */}
                    {"originalFileName" in fileInfo ? (
                      <img
                        src={
                          imageRootPath +
                          "/" +
                          fileInfo.saveFilePath +
                          "/" +
                          fileInfo.saveFileName
                        }
                        alt="업로드된사진"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(fileInfo.file)}
                        alt="업로드된 사진"
                      />
                    )}
                    <button
                      type={"button"}
                      onClick={() => {
                        inputFileRef.current.value = null;
                        onFileDelete(fileInfo.id);
                      }}
                      className={
                        "absolute w-8 h-8 bg-white bottom-3 right-3 rounded-full duration-300"
                      }
                    >
                      <FaTrash className={"w-4 h-4 mx-auto"} />
                    </button>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
      <button
        type={"button"}
        onClick={() => inputFileRef.current.click()}
        className={
          "plusBtn w-12 h-12 mt-6 text-red-500 rounded-full overflow-hidden shadow-md"
        }
      >
        <BsPlusCircleFill className={"w-full h-full"} />
      </button>
    </div>
  );
};
export default memo(FileInput);
