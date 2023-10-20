import AlbumDescription from "./AlbumDescription";
import Header from "../../components/Header";
import AsidePhotos from "./AsidePhotos";
import SelectedPhoto from "./SelectedPhoto";
import SideBar from "../../components/SideBar";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Dialog, DialogContent, Button, IconButton } from "@mui/material";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import {
  setPhotoInfo,
  setSelectedPhoto,
  setMetadata,
  setIsMemberLiked,
} from "./albumReducer";
import { setComments } from "./commentReducer";
import { setIsEditing } from "./Form/formReducer";
import { useSelector, useDispatch } from "react-redux";

const Album = () => {
  console.log("앨범");

  const navigate = useNavigate();
  const { postId } = useParams();
  const location = useLocation();
  const selectedPhotoPath = location.state.selectedPhotoPath;

  // const url = `http://172.20.10.8:8080/photo-post/${postId}`;
  // 테스트 url
  const url = `http://localhost:3002/${postId}`;
  const [isLoading, setIsLoading] = useState(true);

  // 앨범 데이터 관련 state, reducer (RTK 문법)
  const albumStates = useSelector((state) => state.album);
  const albumDispatch = useDispatch();
  // 댓글 데이터 관련 reducer (RTK 문법)
  const commentDispatch = useDispatch();
  // 수정 여부 관련 reducer (RTK 문법)
  const isEditingDispatch = useDispatch();

  // 삭제 버튼 클릭시의 모달창 가시여부
  const [modalVisible, setModalVisible] = useState(false);

  // 실제 앨범 api 호출
  // useEffect(() => {
  //   axios?.get(url)?.then((res) => {
  //     albumDispatch(setPhotoInfo(res.data.response["file-data"]));
  //     albumDispatch(setSelectedPhoto(selectedPhotoPath));
  //     albumDispatch(setMetadata(res.data.response["post-data"]));
  //     albumDispatch(setIsMemberLiked(res.data.response["is-member-liked"]));
  //     commentDispatch(setComments(res.data.response["comment-data"]));
  //     console.log("썸네일사진", selectedPhotoPath);
  //     albumDispatch(setSelectedPhoto(selectedPhotoPath));
  //     setIsLoading(false);
  //   });
  // }, [url]);

  // 테스트 url
  useEffect(() => {
    console.log("앨범 api호출");
    axios?.get(url)?.then((res) => {
      albumDispatch(setPhotoInfo(res.data["file-data"]));
      albumDispatch(setSelectedPhoto(selectedPhotoPath));
      albumDispatch(setMetadata(res.data["post-data"]));
      albumDispatch(setIsMemberLiked(res.data["is-member-liked"]));
      commentDispatch(setComments(res.data["comment-data"]));
      setIsLoading(false);
    });
  }, [url]);

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
      {isLoading || !albumStates.photoInfo || !albumStates.selectedPhoto ? (
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
                setModalVisible(true);
                // 앨범 삭제 로직 추가
              }}
            >
              삭제
            </Button>
            <Button
              style={{ height: "48px", margin: "6px" }}
              variant="outlined"
              onClick={() => {
                let photoInfo = albumStates.photoInfo;
                let title = albumStates.title;
                let bodyContent = albumStates.bodyContent;
                let prevData = { photoInfo, title, bodyContent };
                console.log(prevData);
                isEditingDispatch(setIsEditing(true));
                navigate(`/gallery/${postId}/edit`, {
                  state: {
                    metaData: prevData,
                  },
                });
              }}
            >
              수정
            </Button>
          </div>
          <div className="ctrView flex flex-col m-auto">
            <div className="relative -top-8 w-album-visWth h-screen  flex flex-col justify-center">
              <SelectedPhoto />
              {/* AlbumDescription으로 이동하는 화살표 버튼 */}
              <div className="absolute bottom-8 left-2/4 -translate-x-2/4">
                <FiChevronDown
                  className="text-4xl text-stone-500 cursor-pointer hover:animate-[wiggle_1s_ease-in-out_infinite] hover:text-stone-600"
                  onClick={scrollToDescription}
                />
              </div>
            </div>
            <div className="h-screen pt-32">
              {/* 개별 앨범에 대한 정보(조회수, 좋아요 수)를 인자로 넘김 */}
              <AlbumDescription />
              {/* AlbumMainPhoto으로 이동하는 화살표 버튼 */}
              <div className="absolute bottom-2 left-2/4 -translate-x-2/4">
                <FiChevronUp
                  className="text-4xl text-stone-500 cursor-pointer hover:animate-[wiggle_1s_ease-in-out_infinite] hover:text-stone-600"
                  onClick={scrollToMainPhoto}
                />
              </div>
            </div>
          </div>
          <AsidePhotos photos={albumStates.photoInfo} />
        </div>
      )}
      <Dialog open={modalVisible}>
        <DialogContent className={"relative w-[23rem] h-[10rem]"}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => setModalVisible(false)}
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
              <Button
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
              >
                예
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setModalVisible(false);
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
