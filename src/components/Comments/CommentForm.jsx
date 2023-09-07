import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CommentForm.module.css";
import LikeBtn from "../Button/LikeBtn";
import { Oval } from "react-loader-spinner";

export default function CommentForm({ setComments, albumData }) {
  const { id } = useParams();
  let albumName = `album${id}`;

  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onChange = (event) => {
    setComment(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // 입력값 없는 경우 처리
    if (comment === "") {
      return;
    }

    setIsLoading(true);
    fetch(`http://localhost:3004/${albumName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1234,
        body: comment,
        period: "1초 전",
      }),
    }).then((res) => {
      if (res.ok) {
        // POST 요청이 성공적으로 완료될 때, 데이터를 다시 가져오고 setComments를 호출하여 업데이트
        fetch(`http://localhost:3004/${albumName}`)
          .then((response) => response.json())
          .then((newData) => {
            setComments(newData);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error("데이터를 다시 가져오는 중 오류 발생:", error);
          });
      }
    });
    setComment("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.data}>
        <div className={styles.visits}>
          조회수
          <span className={styles.visitsCnt}>{albumData.visits}</span>
        </div>
        <div className={styles.likes}>
          좋아요
          <span className={styles.likesCnt}>{albumData.likes}</span>
        </div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.profile}></div>
        <form onSubmit={onSubmit}>
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
              className={styles.input}
              value={comment}
              type="text"
              placeholder="댓글 추가"
            />
          )}
        </form>
        <LikeBtn albumData={albumData} />
      </div>
    </div>
  );
}
