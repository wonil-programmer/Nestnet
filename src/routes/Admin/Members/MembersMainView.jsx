import { useState } from "react";
import MemberList from "./MemberList";
import SignupReqList from "./SignupReqList";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

/**
 * 회원관리 페이지
 */
const MembersMainView = () => {
  const [alignment, setAlignment] = useState("members");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <>
      <div className="w-full pt-20 pl-[14rem]">
        <div className="mainView flex flex-col justify-evenly w-full h-full px-9 py-6">
          <div className="text-right">
            <ToggleButtonGroup
              color="secondary"
              size="small"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="members">전체 회원</ToggleButton>
              <ToggleButton value="signupReqs">회원가입 요청</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {alignment === "members" ? (
            <section className="memberList flex flex-col">
              <h1 className="-mt-6 mb-4 ml-2 text-lg font-semibold text-[#111111]">
                전체 회원
              </h1>
              <MemberList></MemberList>
            </section>
          ) : (
            <section className="signupReqList flex flex-col">
              <h1 className="-mt-6 mb-4 ml-2 text-lg font-semibold text-[#111111]">
                회원가입 요청
              </h1>
              <SignupReqList></SignupReqList>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default MembersMainView;
