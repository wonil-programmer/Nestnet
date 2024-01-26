import { FaCalendar } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AttendanceBtn = ({ isMemberAttended = false }) => {
  const { mutate: createMyAttd, isPending: isMyAttdPending } =
    usePostMyAttendance();

  return (
    <div className="absolute bottom-0 right-0 w-[4rem] h-[4rem] overflow-hidden">
      {isMemberAttended ? (
        <div className="flex flex-col justify-center items-center w-full h-full rounded-[0.5rem] cursor-pointer bg-blue-600">
          <FaCalendarCheck className="text-3xl text-white" />
        </div>
      ) : (
        <div
          className="flex flex-col justify-center items-center w-full h-full rounded-[0.5rem] cursor-pointer bg-white border-2 border-home-primary"
          onClick={() => createMyAttd()}
          disabled={isMemberAttended || isMyAttdPending}
        >
          <FaCalendar className="text-3xl text-rose-800" />
        </div>
      )}
    </div>
  );
};

// REST: 출석 등록
function usePostMyAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const myAttdURL = `${process.env.REACT_APP_SERVER}/attendance`;
      return await axios.post(myAttdURL);
    },
    // 클라이언트 업데이트
    onSuccess: () => {
      queryClient.invalidateQueries(["attendance-statistics"]);
    },
  });
}
export default AttendanceBtn;
