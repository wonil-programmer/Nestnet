import AlbumDescription from "./AlbumDescription";
import Header from "../../components/Header";
import AsidePhotos from "./AsidePhotos";
import SelectedPhoto from "./SelectedPhoto";
import SideBar from "../../components/SideBar";
import { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Dialog, DialogContent, Button, IconButton } from "@mui/material";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { IsAlbumLikeContext } from "../../context/IsAlbumLikeContext";
import { CommentsContext } from "../../context/CommentsContext";

/**
 * 앨범 단건 컴포넌트
 */
const Album = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const location = useLocation();
  const { selectedPhotoPath, title, viewCount, likeCount } = location.state;

  const { setComments } = useContext(CommentsContext);
  const { setIsAlbumLike } = useContext(IsAlbumLikeContext);

  const [photoInfo, setPhotoInfo] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [metaData, setMetadata] = useState({
    title: "",
    bodyContent: "",
    viewCount: 0,
    likeCount: 0,
  });

  // 갤러리의 썸네일에서 받아온 앨범 단건에 대한 메타데이터(제목, 조회수, 좋아요수) 주입
  setMetadata((prevState) => ({
    ...prevState,
    title,
    viewCount,
    likeCount,
  }));
  setSelectedPhoto(selectedPhotoPath);

  // 앨범 단건 조회시 api 요청 url
  const albumUrl = `${process.env.REACT_APP_SERVER}/photo-post/${postId}`;
  useEffect(() => {
    axios?.get(albumUrl)?.then((res) => {
      setPhotoInfo(res.data.response["file-data"]);
      setMetadata((prevState) => {
        return {
          ...prevState,
          bodyContent: res.data.response["post-data"].bodyContent,
        };
      });
      setIsAlbumLike(res.data.response["is-member-liked"]);
      setComments(res.data.response["comment-data"]);
      setIsLoading(false);
    });
  }, [albumUrl]);

  const scrollToDescription = () => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  const scrollToMainPhoto = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* <div className={"min-w-screen min-h-screen bg-home-background"}> */}
      <Header />
      {isLoading || !photoInfo || !selectedPhoto ? (
        <h1>Loading</h1>
      ) : (
        <div className="wrapper relative top-[4.6rem] h-full flex bg-home-background">
          <SideBar className="fixed top-48" />
          <div className="fixed flex bottom-[3rem] left-[4rem] w-[10rem] h-[4rem]">
            <Button
              style={{ height: "48px", margin: "6px" }}
              variant="outlined"
              color="error"
              onClick={() => {
                setDeleteModalVisible(true);
                // 앨범 삭제 로직 추가
              }}
            >
              삭제
            </Button>
            <Button
              style={{ height: "48px", margin: "6px" }}
              variant="outlined"
              onClick={() => {
                navigate(`/gallery/${postId}/edit`, {
                  state: {
                    metaData: {
                      photoInfo,
                      title,
                      bodyContent: metaData.bodyContent,
                    },
                  },
                });
              }}
            >
              수정
            </Button>
          </div>
          <div className="ctrView flex flex-col m-auto">
            <div className="relative -top-8 w-album-visWth h-screen  flex flex-col justify-center">
              <SelectedPhoto photo={selectedPhoto} />
              {/* 하단뷰로 이동하는 화살표 버튼 */}
              <div className="absolute bottom-8 left-2/4 -translate-x-2/4">
                <FiChevronDown
                  className="text-4xl text-stone-500 cursor-pointer hover:animate-[wiggle_1s_ease-in-out_infinite] hover:text-stone-600"
                  onClick={scrollToDescription}
                />
              </div>
            </div>
            <div className="h-screen pt-32">
              {/* 개별 앨범에 대한 정보(조회수, 좋아요 수)를 인자로 넘김 */}
              <AlbumDescription metaData={metaData} />
              {/* 상단뷰로 이동하는 화살표 버튼 */}
              <div className="absolute bottom-2 left-2/4 -translate-x-2/4">
                <FiChevronUp
                  className="text-4xl text-stone-500 cursor-pointer hover:animate-[wiggle_1s_ease-in-out_infinite] hover:text-stone-600"
                  onClick={scrollToMainPhoto}
                />
              </div>
            </div>
          </div>
          <AsidePhotos photos={photoInfo} setSelectedPhoto={setSelectedPhoto} />
        </div>
      )}
      <Dialog open={deleteModalVisible}>
        <DialogContent className={"relative w-[23rem] h-[10rem]"}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => setDeleteModalVisible(false)}
          >
            <TiDelete />
          </IconButton>
          <div className="modal">
            <div className="modal-message mt-6 my-5 mx-4">
              해당 게시물을 정말 삭제하시겠습니까?
            </div>
            <div
              className="modal-button"
              style={{
                marginTop: "24px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              {/* 게시물 삭제 구현 필요 */}
              {/* <Button
                className={"w-[4.5rem]"}
                variant="outlined"
                color="error"
                onClick={async () => {
                  setModalVisible(false);
                  axios.delete(``, {
                    postId: postId,
                  });
                  alert("게시물이 성공적으로 삭제되었습니다.");
                  window.location.href = "/gallery";
                }}
              > */}
              {/* </Button> */}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setDeleteModalVisible(false);
                }}
              >
                아니오
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* </div> */}
    </>
  );
};

export default Album;
