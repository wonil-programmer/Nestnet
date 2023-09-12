const Comment = ({ commentKey: commentId, body, period, userId, dispatch }) => {
  return (
    <>
      <li className="w-full" key={commentId}>
        <div className="w-full flex pb-4">
          <div className="profile flex flex-col justify-center mr-6">
            <div className="w-[2.3rem] h-[2.3rem] rounded-3xl bg-slate-900">
              <div>{userId}</div>
              <img className="" src="" alt="" />
            </div>
          </div>
          <div className="w-full break-all">
            <div className="w-full whitespace-normal">{body}</div>
            <div className="flex mt-2 pr-8 text-[0.9rem]">
              <span className="mr-4">{period}</span>
              {/* 답글 로직 처리 필요 */}
              <div className="">답글</div>
              <button
                onClick={() => {
                  dispatch({ type: "delete-comment", payload: { commentId } });
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Comment;
