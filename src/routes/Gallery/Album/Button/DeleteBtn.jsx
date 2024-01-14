import { CircleButton as Button } from "../../../../components/CircleButton";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const DeleteBtn = () => {
  const { postId } = useParams();

  const { mutate: deleteAlbum, isPending: isDeletingAlbum } = useDeleteAlbum();
  const handleAlbumDelete = () => {
    deleteAlbum(postId);
  };

  return (
    <div className="mt-3">
      <Button
        onClick={handleAlbumDelete}
        content={<MdDelete className="mt-1 text-3xl" />}
      />
    </div>
  );
};

// REST: 앨범 삭제
const useDeleteAlbum = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (postId) => {
      // const albumDeletionURL = `${process.env.REACT_APP_SERVER}/post/delete/${postId}`;
      const albumDeletionURL = `${process.env.REACT_APP_SERVER}/photo-post?postId=${postId}`;
      return await axios.delete(albumDeletionURL);
    },
    // 클라이언트 업데이트
    onSuccess: () => {
      queryClient.invalidateQueries(["album"]);
      navigate("/gallery");
    },
  });
};

export default DeleteBtn;
