import { RiPencilFill } from "react-icons/ri";

import { CircleButton as Button } from "../../../../components/CircleButton";
import { useNavigate } from "react-router-dom";

/**
 * 앨범 수정 버튼
 * @param {boolean} existingData
 * @returns
 */
const ModifyBtn = ({ existingData }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-3">
      <Button
        onClick={() => navigate(`edit`, { state: existingData })}
        content={<RiPencilFill className="mt-1 text-3xl" />}
      />
    </div>
  );
};

export default ModifyBtn;
