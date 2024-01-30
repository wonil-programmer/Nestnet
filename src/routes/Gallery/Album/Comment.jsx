import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import StringCombinator from "../../../utils/Combinator/StringCombinator";

const Comment = ({ comment, isAlbumLoading }) => {
  const {
    id: commentId,
    username,
    content,
    createdTime,
    modifiedTime,
    memberWritten: isMemberWritten,
  } = comment;

  // 댓글 수정중 내용
  const [updateValue, setUpdateValue] = useState("");
  // 수정여부
  const [isUpdateTarget, setIsUpdateTarget] = useState(false);
  const updateInputRef = useRef(null);

  const { mutate: updateComment, isPending: isUpdatePending } =
    useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();

  // 수정 시도
  const onUpdateTargetClick = () => {
    setIsUpdateTarget(true);
    setUpdateValue(content);
  };

  // 수정 완료
  const handleUpdateComplete = () => {
    updateComment({ commentId, updateValue });
    setIsUpdateTarget(false);
  };

  // 삭제 시도
  const handleCommentDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteComment(commentId);
    }
  };

  const updateInput = (
    <textarea
      onChange={() => setUpdateValue(updateInputRef.current.value)}
      className="flex w-full break-all px-3 border-b border-red-300 focus:outline-none focus:border-red-500"
      type="text"
      value={updateValue}
      ref={updateInputRef}
      minLength={2}
      maxLength={100}
      rows={2}
    />
  );

  return (
    <>
      <li className="w-full" key={commentId}>
        <div className="w-full flex pb-4">
          <div className="profile flex flex-col justify-start mr-6 pt-1">
            {/* 프로필 원 */}
            <div>{username}</div>
          </div>
          <div className="w-full break-all">
            {isUpdateTarget ? (
              updateInput
            ) : (
              <div className="w-full whitespace-normal">
                {isUpdatePending ? (
                  <div className="w-full h-fit text-center">
                    {/* 로딩스피너 */}
                  </div>
                ) : (
                  content
                )}
              </div>
            )}
            <div className="flex flex-row justify-between mt-2 pr-4 text-[0.8rem]">
              <div className={`${isUpdateTarget ? "invisible" : ""}`}>
                {StringCombinator.getFormatDate(createdTime)}
              </div>
              <div>
                {isMemberWritten ? (
                  isUpdateTarget ? (
                    <>
                      <button
                        className="mr-2"
                        onClick={() => setIsUpdateTarget(false)}
                      >
                        취소
                      </button>
                      <button onClick={() => handleUpdateComplete()}>
                        완료
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="mr-2 hover:underline hover:underline-offset-2"
                        onClick={() => onUpdateTargetClick()}
                      >
                        수정
                      </button>
                      <button
                        className="hover:underline hover:underline-offset-2"
                        onClick={() => handleCommentDelete()}
                      >
                        삭제
                      </button>
                    </>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

// REST: 댓글 수정
function useUpdateComment() {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  return useMutation({
    mutationFn: async ({ commentId, updateValue }) => {
      const commentUpdateURL = `${process.env.REACT_APP_SERVER}/comment/modify/${commentId}`;
      return await axios.post(commentUpdateURL, {
        content: updateValue,
      });
    },

    // 클라이언트 업데이트
    onSuccess: () => {
      queryClient.invalidateQueries(["album", postId]);
    },
    onError: () => {
      window.alert("댓글 수정에 실패하였습니다.");
    },
  });
}

// REST: 댓글 삭제
function useDeleteComment() {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  return useMutation({
    mutationFn: async (commentId) => {
      const commentDeletionURL = `${process.env.REACT_APP_SERVER}/comment/delete/${commentId}`;
      return await axios.delete(commentDeletionURL);
    },

    // 클라이언트 업데이트
    onSuccess: () => {
      queryClient.invalidateQueries(["album", postId]);
    },
    onError: () => {
      window.alert("댓글 삭제에 실패하였습니다.");
    },
  });
}
export default Comment;
