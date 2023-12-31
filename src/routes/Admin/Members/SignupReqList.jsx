import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaHandshakeSimple, FaHandshakeSimpleSlash } from "react-icons/fa6";
import axios from "axios";

const SignupReqList = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "성명",
        enableEditing: false,
        size: 50,
        maxSize: 50,
      },
      {
        accessorKey: "loginId",
        header: "아이디",
        enableEditing: false,
        size: 50,
        maxSize: 50,
      },
      {
        accessorKey: "studentId",
        header: "학번",
        enableEditing: false,
        size: 50,
        maxSize: 50,
      },
      {
        accessorKey: "grade",
        header: "학년",
        enableEditing: false,
        size: 50,
        maxSize: 50,
      },
      {
        accessorKey: "graduateYear",
        header: "졸업년도",
        enableEditing: false,
        size: 50,
        maxSize: 50,
      },
      {
        accessorKey: "memberAuthority",
        header: "권한",
        enableEditing: false,
        size: 50,
        maxSize: 50,
      },
    ],
    []
  );

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
  const { mutateAsync: withdrawReq, isPending: isDeletingReq } =
    useWithdrawReq();

  // UPDATE action
  const handleApproveReq = (row) => {
    approveReq(row.original.id);
  };
  // DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("회원가입 요청을 정말 철회하겠습니까?")) {
      withdrawReq(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedSignupReqs,
    getRowId: (row) => row.id,
    enableEditing: true,
    initialState: { density: "compact" },
    enableFilters: false,
    enableHiding: false,
    muiToolbarAlertBannerProps: isLoadingSignupReqsError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="승인">
          <IconButton color="success" onClick={() => handleApproveReq(row)}>
            <FaHandshakeSimple />
          </IconButton>
        </Tooltip>
        <Tooltip title="거절">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
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

function convertAuthorityToKorean(permission) {
  switch (permission) {
    case "PRESIDENT":
      return "회장";
    case "VICE_PRESIDENT":
      return "부회장";
    case "MANAGER":
      return "관리자";
    case "GENERAL_MEMBER":
      return "일반";
    case "ON_LEAVE_MEMBER":
      return "휴학";
    case "GRADUATED_MEMBER":
      return "졸업";
    case "WAITING_FOR_APPROVAL":
      return "승인대기";
    case "WITHDRAWN_MEMBER":
      return "탈퇴";

    default:
      return "알 수 없음";
  }
}

// GET: 회원가입 목록 조회 api
function useGetSignupReqs() {
  return useQuery({
    queryKey: ["signups"],
    queryFn: async () => {
      //   const allSignupReqsURL = `${process.env.REACT_APP_SERVER}/manager/signup-request`;
      //   const response = await axios.get(allSignupReqsURL);
      //   const users = response.data;

      // dummy
      const users = [
        {
          id: 1,
          name: "김진짜",
          loginId: "real",
          studentId: "2023036068",
          grade: 1,
          graduateYear: 2027,
          memberAuthority: "GENERAL_MEMEBER",
        },
        {
          id: 2,
          name: "김진짜",
          loginId: "real",
          studentId: "2023036068",
          grade: 1,
          graduateYear: 2027,
          memberAuthority: "GENERAL_MEMEBER",
        },
        {
          id: 3,
          name: "김진짜",
          loginId: "real",
          studentId: "2023036068",
          grade: 1,
          graduateYear: 2027,
          memberAuthority: "GENERAL_MEMEBER",
        },
        {
          id: 4,
          name: "김진짜",
          loginId: "real",
          studentId: "2023036068",
          grade: 1,
          graduateYear: 2027,
          memberAuthority: "GENERAL_MEMEBER",
        },
      ];

      const transformedUsers = users.map((user) => ({
        ...user,
        memberAuthority: convertAuthorityToKorean(user.memberAuthority),
      }));

      return transformedUsers;
    },
    refetchOnWindowFocus: false,
  });
}

// POST: 회원가입 요청 승인 api
function useApproveReq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (signupReqId) => {
      const approveReqURL = `${process.env.REACT_APP_SERVER}/manager/member-withdraw/${signupReqId}`;
      console.log(signupReqId);
      //   axios
      //     .post(approveReqURL, {
      //       loginId: user.loginId,
      //       memberAuthority: user.memberAuthority,
      //     })
      //     .then(function (response) {
      //       console.log(response);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    },
    onMutate: (signupReqId) => {
      queryClient.setQueryData(["signups"], (prevSignupReqs) =>
        prevSignupReqs?.filter((signupReq) => signupReq.id !== signupReqId)
      );
    },
  });
}

// DELETE: 회원가입 요청 거절 api
function useWithdrawReq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (signupReqId) => {
      const withdrawReqURL = `${process.env.REACT_APP_SERVER}/`;
      //   axios
      //     .delete(withdrawReqURL)
      //     .then((response) => {
      //       console.log(`회원가입 요청 철회 완료`);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
    },
    onMutate: (signupReqId) => {
      queryClient.setQueryData(["signups"], (prevSignupReqs) =>
        prevSignupReqs?.filter((signupReq) => signupReq.id !== signupReqId)
      );
    },
  });
}

export default SignupReqList;
