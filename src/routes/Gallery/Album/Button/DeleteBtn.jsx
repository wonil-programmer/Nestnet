import { MdDelete } from "react-icons/md";

import { CircleButton as Button } from "../../../../components/CircleButton";

const DeleteBtn = () => {
  return (
    <div className="mt-3">
      <Button content={<MdDelete className="mt-1 text-3xl" />} />
    </div>
  );
};

export default DeleteBtn;
