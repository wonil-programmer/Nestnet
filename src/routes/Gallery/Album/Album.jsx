import AlbumDescription from "./AlbumDescription";
import UnselectedPhotos from "./UnselectedPhotos";
import SelectedPhoto from "./SelectedPhoto";
import CommentRegistration from "./CommentRegistration";
import AlbumActionBanner from "./AlbumActionBanner";
import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const Album = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPhotoPath, title, viewCount, likeCount } = location.state;
  const [selectedPhoto, setSelectedPhoto] = useState("");
  useEffect(() => {
    setSelectedPhoto(selectedPhotoPath);
  }, [selectedPhotoPath]);

  const [metaData, setMetadata] = useState({
    title,
    bodyContent: null,
    viewCount,
    likeCount,
  });

  const { data = {}, isLoading: isAlbumLoading, status } = useGetAlbum();
  const {
    photoPostDto: postData,
    fileDtoList: fileData,
    commentResponseList: commentData,
    memberLiked: isMemberLiked,
  } = data;

  useEffect(() => {
    if (status === "success") {
      setMetadata((prevState) => ({
        ...prevState,
        bodyContent: postData?.bodyContent,
      }));
    }
  }, [status, postData?.bodyContent]);

  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  return (
    <div className="max-w-screen bg-home-background">
      <div className="mainView flex flex-row justify-between">
        <div className="leftSideView w-1/4 min-w-[12rem]">{/* 사이드바 */}</div>
        <div className="centerView w-2/4 min-w-[50rem] h-[calc(100vh-4.7rem)] pl-10 overflow-y-auto">
          <div className="flex flex-row">
            <div className="relative flex flex-col m-auto items-center w-[40rem]">
              <div
                className={`selectedPhotoContainer w-[40rem] h-max mt-4 ${
                  isDescriptionVisible ? "rounded-t-3xl" : "rounded-3xl"
                } overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]`}
              >
                <SelectedPhoto selectedPhoto={selectedPhoto} />
              </div>
              <AlbumDescription
                isAlbumLoading={isAlbumLoading}
                metaData={metaData}
                comments={commentData}
                isDescriptionVisible={isDescriptionVisible}
              />
              <CommentRegistration
                isDescriptionVisible={isDescriptionVisible}
              />
            </div>
            <div className="w-[5rem]">
              <AlbumActionBanner
                selectedPhoto={selectedPhoto}
                setIsDescriptionVisible={setIsDescriptionVisible}
                isMemberLiked={isMemberLiked}
                data={data}
              />
            </div>
          </div>
        </div>
        <div className="relative w-1/4">
          <div className="w-[20rem] min-w-[20rem] max-w-[20rem] h-[calc(100vh-4.7rem)] pt-3 ml-auto px-12 pr-14 overflow-y-scroll">
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
      // const albumURL = `${process.env.REACT_APP_SERVER}/photo-post/${postId}`;
      // return await axios.get(albumURL).then((res) => res.data.response);

      // test: json-server
      const albumURL = `${process.env.REACT_APP_SERVER}/album/?id=${postId}`;
      return await axios.get(albumURL).then((res) => res.data[0]);
    },
  });
};

export default Album;
