import MemberList from "./MemberList";

const MembersMainView = () => {
  return (
    <>
      <section className="w-full h-screen pt-20 pl-[14rem]">
        <div className="mainView w-full h-full px-9 py-6">
          <MemberList></MemberList>
        </div>
      </section>
    </>
  );
};

export default MembersMainView;
