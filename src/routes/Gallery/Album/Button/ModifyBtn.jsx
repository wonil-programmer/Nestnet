import { RiPencilFill } from "react-icons/ri";

import { CircleButton as Button } from "../../../../components/CircleButton";

const ModifyBtn = () => {
  return (
    <div className="mt-3">
      <Button content={<RiPencilFill className="mt-1 text-3xl" />} />
    </div>
  );
};

export default ModifyBtn;
