import AlbumDescription from "./AlbumDescription";
import UnselectedPhotos from "./UnselectedPhotos";
import SelectedPhoto from "./SelectedPhoto";
import DownloadBtn from "./DownloadBtn";
import SideBar from "../../../components/SideBar";
import AlbumActionBanner from "./AlbumActionBanner";
import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, Button, IconButton } from "@mui/material";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Album = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPhotoPath, title, viewCount, likeCount } = location.state;
  const [selectedPhoto, setSelectedPhoto] = useState("");
  useEffect(() => {
    setSelectedPhoto(selectedPhotoPath);
  }, [selectedPhotoPath]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [metaData, setMetadata] = useState({
    title,
    bodyContent: null,
    viewCount,
    likeCount,
  });

  const {
    data: albumData = {},
    isLoading: isAlbumLoading,
    status,
  } = useGetAlbum();
  const {
    "comment-data": commentData,
    "file-data": fileData,
    "is-member-liked": isMemberLiked,
    "post-data": postData,
    postId,
  } = albumData;

  useEffect(() => {
    if (status === "success") {
      setMetadata((prevState) => ({
        ...prevState,
        bodyContent: postData?.bodyContent,
      }));
    }
  }, [status, postData?.bodyContent]);

  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const testRef = useRef();

  return (
    <div className="max-w-screen bg-home-background">
      <div className="mainView flex flex-row justify-between">
        <div className="leftSideView w-1/4 min-w-[12rem] bg-gray-800"></div>
        <div className="centerView w-2/4 min-w-[40rem] h-[calc(100vh-4.7rem)] overflow-y-auto">
          <div className="relative flex flex-col m-auto items-center w-4/5">
            <div
              className={
                "selectedPhotoContainer relative z-10 max-w-max h-max m-auto my-4 text-center rounded-xl shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
              }
            >
              <div className="cursor-zoom-in">
                <SelectedPhoto
                  selectedPhoto={selectedPhoto}
                  isCommentVisible={isCommentVisible}
                />
              </div>
              <div className="flex flex-row justify-end absolute top-0 left-0 w-[calc(100%+4.5rem)] h-full">
                <AlbumActionBanner
                  selectedPhoto={selectedPhoto}
                  setIsCommentVisible={setIsCommentVisible}
                />
              </div>
              <AlbumDescription metaData={metaData} />
            </div>
            <div className="absolute top-4 right-4"></div>
          </div>
        </div>
        <div className="relative w-1/4">
          <div className="w-[20rem] min-w-[20rem] max-w-[20rem] h-[calc(100vh-4.7rem)] pt-3 ml-auto px-12 pr-14 overflow-y-scroll">
            <UnselectedPhotos
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
      // test: json-server
      const albumURL = `${process.env.REACT_APP_SERVER}/album/?postId=${postId}`;

      return await axios.get(albumURL).then((res) => res.data[0]);
    },
  });
};

export default Album;
