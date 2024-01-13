import { MdComment } from "react-icons/md";

import { CircleButton as Button } from "../../../../components/CircleButton";

const CommentActivationBtn = ({ setIsDescriptionVisible }) => {
  const toggleDescriptionVisibility = () => {
    setIsDescriptionVisible((prev) => !prev);
  };

  return (
    <div className="my-3" onClick={toggleDescriptionVisibility}>
      <Button content={<MdComment className="mt-1 text-3xl" />} />
    </div>
  );
};

export default CommentActivationBtn;
