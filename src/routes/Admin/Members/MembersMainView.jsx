import MemberList from "./MemberList";
import SignupReqList from "./SignupReqList";

const MembersMainView = () => {
  return (
    <>
      <div className="w-full pt-20 pl-[14rem]">
        <div className="mainView flex flex-col justify-evenly w-full h-full px-9 py-6">
          <section className="memberList flex flex-col">
            <h1 className="mb-4 text-lg font-semibold text-[#111111]">
              동아리원
            </h1>
            <MemberList></MemberList>
          </section>
          <section className="signupReqList flex flex-col">
            <h1 className="my-4 text-lg font-semibold text-[#111111]">
              회원가입 요청
            </h1>
            <SignupReqList></SignupReqList>
          </section>
        </div>
      </div>
    </>
  );
};

export default MembersMainView;
