import { useState } from "react";
import { useParams } from "react-router-dom";
import LikeBtn from "../Button/LikeBtn";
import { Oval } from "react-loader-spinner";
import { useRef } from "react";

export default function CommentForm({ setComments, albumData }) {
  console.log("댓글입력창");
  const { id } = useParams();
  let albumName = `album${id}`;

  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const onChange = (event) => {
    setComment(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (comment === "") {
      return;
    }
    // 댓글 입력 post 요청
    setIsLoading(true);
    fetch(`http://localhost:3004/${albumName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1234,
        body: comment,
        period: "방금",
      }),
    }).then((res) => {
      if (res.ok) {
        // POST 요청이 성공적으로 완료될 때, 데이터를 다시 가져오고 setComments를 호출하여 업데이트
        fetch(`http://localhost:3004/${albumName}`)
          .then((response) => response.json())
          .then((newData) => {
            setComments(newData);
            setIsLoading(false);
            inputRef.current.focus();
          })
          .catch((error) => {
            console.error("데이터를 다시 가져오는 중 오류 발생:", error);
          });
      }
    });
    setComment("");
  };

  return (
    <div className="w-full h-36 pt-2 pb-0 px-8 mt-auto border-t border-border-primary">
      <div className="flex py-[0.6rem] px-0">
        <div className="visit mr-2 ml-auto">
          조회수
          <span className="visitCnt ml-2">{albumData.visits}</span>
        </div>
        <div className="likes mr-2">
          좋아요
          <span className="likesCnt ml-2">{albumData.likes}</span>
        </div>
      </div>
      <div className="mt-[0.8rem] flex">
        <div className="profile bg-slate-950 w-12 h-12 ml-4 mr-8 rounded-3xl"></div>
        <form className="flex-auto mr-2" onSubmit={onSubmit}>
          {isLoading ? (
            <div class="w-full h-full pt-2 pb-1 flex justify-center">
              <Oval
                height={30}
                width={30}
                color="gray"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="gray"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : (
            <input
              onChange={onChange}
              className="flex w-full h-full py-0 px-6 bg-[#efefef] border-none rounded-3xl outline-4 outline-red-300"
              value={comment}
              type="text"
              placeholder="댓글 추가"
              ref={inputRef}
            />
          )}
        </form>
        <LikeBtn albumData={albumData} />
      </div>
    </div>
  );
}
