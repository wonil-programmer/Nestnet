import { RiPencilFill } from "react-icons/ri";

import { CircleButton as Button } from "../../../../components/CircleButton";
import { useNavigate } from "react-router-dom";

const ModifyBtn = ({ existingData }) => {
  const navigate = useNavigate();
  const isDataEmpty = Object.keys(existingData).length === 0;

  return (
    <div className="mt-3">
      <Button
        onClick={() => navigate(`edit`, { state: existingData })}
        content={<RiPencilFill className="mt-1 text-3xl" />}
        disabled={isDataEmpty}
      />
    </div>
  );
};

export default ModifyBtn;
