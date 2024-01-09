import AlbumDescription from "./AlbumDescription";
import UnselectedPhotos from "./UnselectedPhotos";
import SelectedPhoto from "./SelectedPhoto";
import SideBar from "../../components/SideBar";
import { useState, useEffect } from "react";
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

  return (
    <div className="max-w-screen bg-home-background">
      <div className="mainView flex flex-row justify-between">
        <div className="leftSideView w-1/3 min-w-[12rem] bg-gray-800"></div>
        <div className="centerView w-1/3 min-w-[40rem] h-[calc(100vh-4.7rem)] px-10 overflow-y-auto">
          <div
            className={
              "relative max-w-max h-max m-auto my-4 text-center rounded-xl overflow-hidden shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] cursor-zoom-in"
            }
          >
            <SelectedPhoto selectedPhoto={selectedPhoto} />
          </div>
          <div className="">{/* <Comments></Comments> */}</div>
        </div>
        <div className="relative w-1/3">
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
