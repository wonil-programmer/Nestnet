const Comment = ({ comment, key: id }) => {
  return (
    <>
      <li className="w-full" key={id}>
        <div className="w-full flex pb-4">
          <div className="profile flex flex-col justify-center mr-6">
            <div className="w-[2.3rem] h-[2.3rem] rounded-3xl bg-slate-900">
              {/* <div>{comment.userId}</div> 넘겨받은 유저아이디 */}
              <img className="" src="" alt="" />
            </div>
          </div>
          <div className="w-full break-all">
            <div className="w-full whitespace-normal">{comment.body}</div>
            <div className="flex mt-2 pr-8 text-[0.9rem]">
              <span className="mr-4">{comment.period}</span>
              {/* 답글 로직 처리 필요 */}
              <div className="">답글</div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Comment;
