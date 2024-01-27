import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { CircleButton as Button } from "../../../components/CircleButton";
import axios from "axios";
// import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const LikeBtn = ({ isMemberLiked, likeCount }) => {
  // const [oldLikeState, setOldLikeState] = useState(false);
  // const [oldLikeCount, setOldLikeCount] = useState(likeCount);

  const { data: isLiked } = useGetIsMemberLiked(isMemberLiked);
  const { mutate: updateAlbumLike } = usePostAlbumLike();

  const queryClient = useQueryClient();
  // const debouncedMutate = debounce(updateAlbumLike, 1000);

  const handleButtonClick = useCallback(async () => {
    await queryClient.cancelQueries({ queryKey: ["likeState"] });
    await queryClient.cancelQueries({ queryKey: ["likeCount"] });

    const previousLikeState = queryClient.getQueryData(["likeState"]);
    const previousLikeCount = queryClient.getQueryData(["likeCount"]);
    queryClient.setQueryData(["likeState"], !previousLikeState);
    queryClient.setQueryData(
      ["likeCount"],
      previousLikeState ? previousLikeCount - 1 : previousLikeCount + 1
    );
    updateAlbumLike();
    // debouncedMutate();
  }, [updateAlbumLike, queryClient]);

  return (
    <div className="mt-3">
      <Button
        onClick={() => {
          handleButtonClick().catch((reason) => console.error(reason));
        }}
        content={
          isLiked ? (
            <FaHeart className="m-auto text-2xl text-red-400" />
          ) : (
            <FaHeart className="m-auto text-2xl text-slate-300" />
          )
        }
      />
    </div>
  );
};

// 좋아요 여부 캐시 저장
const useGetIsMemberLiked = (isMemberLiked) => {
  return useQuery({
    queryKey: ["likeState"],
    queryFn() {
      return Promise.resolve(isMemberLiked);
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    gcTime: 0,
  });
};

// REST: 좋아요 요청
function usePostAlbumLike() {
  const queryClient = useQueryClient();
  const { postId } = useParams();

  return useMutation({
    mutationFn() {
      const likeState = queryClient.getQueryData(["likeState"]);
      return axios.post(
        `${process.env.REACT_APP_SERVER}/post/${
          likeState ? "like" : "cancel-like"
        }`,
        { postId },
        {
          withCredentials: true,
          headers: { Authorization: localStorage.getItem("access_token") },
        }
      );
    },
    // 클라이언트 업데이트
    // SUCCESS: 재조회
    onSuccess() {
      return queryClient.invalidateQueries({ queryKey: ["album", postId] });
    },

    // ERROR: 기존 데이터 폴백
    // onError() {
    //   queryClient.setQueryData(["likeState"], oldLikeState);
    //   queryClient.setQueryData(["likeCount"], oldLikeCount);
    // },
  });
}

export default LikeBtn;
