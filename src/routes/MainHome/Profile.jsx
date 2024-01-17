import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <>
      <Link to="/profile">
        <AiOutlineUser className="w-8 h-8" />
      </Link>
    </>
  );
};
