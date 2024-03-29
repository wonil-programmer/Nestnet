import AlbumDescription from "./AlbumDescription";
import UnselectedPhotos from "./UnselectedPhotos";
import SelectedPhoto from "./SelectedPhoto";
import CommentRegistration from "./CommentRegistration";
import DownloadBtn from "./DownloadBtn";
import CommentActivationBtn from "./CommentActivationBtn";
import LikeBtn from "./LikeBtn";
import DeleteBtn from "./Button/DeleteBtn";
import ModifyBtn from "./Button/ModifyBtn";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import StringCombinator from "../../../utils/Combinator/StringCombinator";

/**
 * 단건 앨범
 * @returns
 */
const Album = () => {
  // 선택된 사진의 url
  const [selectedPhoto, setSelectedPhoto] = useState("");

  // 앨범 댓글창(메타데이터 포함한 컴포넌트) 표시 여부
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const {
    data: originalData = {},
    isLoading: isAlbumLoading,
    status,
  } = useGetAlbum();
  const {
    photoPostDto: postMetaData,
    fileDtoList: fileData,
    commentDtoList: commentData,
    memberLiked: isMemberLiked,
  } = originalData;

  // 요청 성공시 사진 배열 첫번째 요소를 선택된 사진(현재 보고 있는 사진)으로 지정
  useEffect(() => {
    if (status === "success") {
      setSelectedPhoto(StringCombinator.getImagePath(fileData[0]));
    }
  }, [status, fileData, postMetaData]);

  return (
    <div className="max-w-screen pt-[6rem] bg-home-background">
      <div className="mainView flex flex-row justify-between">
        <div className="leftSideView w-1/4 min-w-[12rem]">{/* 사이드바 */}</div>
        <div className="centerView w-2/4 min-w-[50rem] h-[calc(100vh-6rem)] pl-10 overflow-y-auto">
          <div className="flex flex-row">
            <div className="relative flex flex-col m-auto items-center w-[40rem]">
              <div
                className={`selectedPhotoContainer w-[40rem] mt-4 ${
                  selectedPhoto ? "h-max" : "h-screen"
                } ${
                  isDescriptionVisible ? "rounded-t-2xl" : "rounded-2xl"
                } overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]`}
              >
                <SelectedPhoto selectedPhoto={selectedPhoto} />
              </div>
              <AlbumDescription
                isAlbumLoading={isAlbumLoading}
                isDescriptionVisible={isDescriptionVisible}
                postMetaData={postMetaData}
                comments={commentData}
              />
              <CommentRegistration
                isDescriptionVisible={isDescriptionVisible}
              />
            </div>
            <div className="actionBanner w-[5rem]">
              {isAlbumLoading ? null : (
                <div className="flex flex-col flex-start items-center h-full mt-8 pr-3">
                  <DownloadBtn selectedPhoto={selectedPhoto} />
                  <CommentActivationBtn
                    setIsDescriptionVisible={setIsDescriptionVisible}
                  />
                  <LikeBtn
                    isMemberLiked={isMemberLiked}
                    likeCount={postMetaData?.likeCount}
                  />
                  {/* 권한자에게만 보이는 버튼 */}
                  {postMetaData?.memberWritten ? (
                    <>
                      <ModifyBtn existingData={originalData} />
                      <DeleteBtn />
                    </>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative w-1/4">
          <div className="w-[20rem] min-w-[20rem] max-w-[20rem] h-[calc(100vh-6rem)] pt-5 ml-auto px-12 pr-14 overflow-y-scroll">
            <UnselectedPhotos
              isAlbumLoading={isAlbumLoading}
              photos={fileData}
              setSelectedPhoto={setSelectedPhoto}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// REST: 앨범 단건 조회
const useGetAlbum = () => {
  const { postId } = useParams();

  return useQuery({
    queryKey: ["album", postId],
    queryFn: async () => {
      const albumURL = `${process.env.REACT_APP_SERVER}/photo-post/${postId}`;
      return await axios.get(albumURL).then((res) => {
        return res.data.response;
      });

      // // TEST: json-server
      // const albumURL = `${process.env.REACT_APP_SERVER}/album?id=${postId}`;
      // return await axios.get(albumURL).then((res) => res.data[0]);
    },
  });
};

export default Album;
