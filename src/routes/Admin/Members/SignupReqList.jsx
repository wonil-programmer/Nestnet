import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaHandshakeSimple, FaHandshakeSimpleSlash } from "react-icons/fa6";
import axios from "axios";
import {
  AUTHORITY_ENG_TO_KOR,
  AUTHORITY_KOR_TO_ENG,
  TABLE_COL_NAME,
  WINDOW_ALERT_MESSAGE,
} from "../../../constant/Constant";

/**
 * 회원가입 요청 목록 테이블
 */
const SignupReqList = () => {
  const columns = useMemo(() => TABLE_COL_NAME.signup, []);

  // call READ hook
  const {
    data: fetchedSignupReqs = [],
    isError: isLoadingSignupReqsError,
    isFetching: isFetchingSignupReqs,
    isLoading: isLoadingSignupReqs,
  } = useGetSignupReqs();
  // call UPDATE hook
  const { mutateAsync: approveReq, isPending: isApprovingReq } =
    useApproveReq();
  // call DELETE hook
  const { mutateAsync: rejectReq, isPending: isDeletingReq } = useRejectReq();

  // 회원가입 요청 승인 핸들러
  const handleReqApprove = async ({ id, original }) => {
    if (window.confirm(WINDOW_ALERT_MESSAGE.signupApproval(original))) {
      approveReq({ id, signupReq: original });
    }
  };
  // 회원가입 요청 거절 핸들러
  const handleReqReject = ({ id, original }) => {
    if (window.confirm(WINDOW_ALERT_MESSAGE.signupReject(original))) {
      rejectReq({ id, signupReq: original });
    }
  };

  // 테이블 속성 정의
  const table = useMaterialReactTable({
    columns,
    data: fetchedSignupReqs,
    getRowId: (row) => row.id,
    initialState: { density: "compact" },
    enableEditing: true,
    enableFilters: false,
    enableHiding: false,
    positionActionsColumn: "last", // 버튼 위치
    muiToolbarAlertBannerProps: isLoadingSignupReqsError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "400px",
      },
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Tooltip title="승인">
          <IconButton color="success" onClick={() => handleReqApprove(row)}>
            <FaHandshakeSimple />
          </IconButton>
        </Tooltip>
        <Tooltip title="거절">
          <IconButton color="error" onClick={() => handleReqReject(row)}>
            <FaHandshakeSimpleSlash />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    state: {
      isLoading: isLoadingSignupReqs,
      isSaving: isApprovingReq || isDeletingReq,
      showAlertBanner: isLoadingSignupReqsError,
      showProgressBars: isFetchingSignupReqs,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

// REST: 회원가입 요청 목록 조회
function useGetSignupReqs() {
  return useQuery({
    queryKey: ["signups"],
    queryFn: async () => {
      const signupReqsURL = `${process.env.REACT_APP_SERVER}/manager/signup-request`;
      return await axios.get(signupReqsURL).then((res) => {
        const reqs = res.data.response.dtoList;

        return reqs.map((req) => ({
          ...req,
          memberAuthority: AUTHORITY_ENG_TO_KOR[req.memberAuthority] ?? "-",
        }));
      });
    },
    refetchOnWindowFocus: false,
  });
}

// REST: 회원가입 요청 승인
function useApproveReq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ signupReq }) => {
      const approveReqURL = `${process.env.REACT_APP_SERVER}/manager/approve-signup`;
      return await axios.post(approveReqURL, {
        loginId: signupReq.loginId,
        memberAuthority: AUTHORITY_KOR_TO_ENG[signupReq.memberAuthority],
      });
    },
    // 클라이언트 업데이트
    onSuccess: () => {
      queryClient.invalidateQueries(["signups"]);
    },
  });
}

// REST: 회원가입 요청 거절
function useRejectReq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ signupReq }) => {
      const rejectReqURL = `${process.env.REACT_APP_SERVER}/manager/reject-signup`;
      return await axios.post(rejectReqURL, {
        loginId: signupReq.loginId,
        memberAuthority: AUTHORITY_KOR_TO_ENG[signupReq.memberAuthority],
      });
    },
    // 클라이언트 업데이트
    onSuccess: () => {
      queryClient.invalidateQueries(["signups"]);
    },
  });
}

export default SignupReqList;
