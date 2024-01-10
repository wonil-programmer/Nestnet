import { MdComment } from "react-icons/md";

import { CircleButton as Button } from "../../../components/CircleButton";

const CommentActivationBtn = ({}) => {
  return (
    <div className="my-3">
      <Button content={<MdComment className="mt-1 text-3xl" />} />
    </div>
  );
};

export default CommentActivationBtn;
