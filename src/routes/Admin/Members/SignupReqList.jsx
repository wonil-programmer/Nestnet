import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaHandshakeSimple, FaHandshakeSimpleSlash } from "react-icons/fa6";
import axios from "axios";
import { AUTHORITY_ENG_TO_KOR } from "../../../constant/Constant";

/**
 * 회원가입 요청 목록 테이블
 */
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
  const { mutateAsync: disapproveReq, isPending: isDeletingReq } =
    useDisapproveReq();

  // 회원가입 요청 승인 핸들러
  const handleApproveReq = async (row) => {
    approveReq(row.original);
  };
  // 회원가입 요청 미승인 핸들러
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("해당 회원가입 요청을 정말 승인하지 않으시겠습니까?")) {
      disapproveReq(row.original);
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
          <IconButton color="success" onClick={() => handleApproveReq(row)}>
            <FaHandshakeSimple />
          </IconButton>
        </Tooltip>
        <Tooltip title="미승인">
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

// REST: 회원가입 요청 목록 조회
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
          grade: 2,
          graduateYear: 2027,
          memberAuthority: "WAITING_FOR_APPROVAL",
        },
        {
          id: 2,
          name: "김가짜",
          loginId: "fake",
          studentId: "2023036068",
          grade: 2,
          graduateYear: 2027,
          memberAuthority: "WAITING_FOR_APPROVAL",
        },
        {
          id: 3,
          name: "박기안",
          loginId: "kian84",
          studentId: "2024036068",
          grade: 1,
          graduateYear: 2027,
          memberAuthority: "WAITING_FOR_APPROVAL",
        },
        {
          id: 4,
          name: "주우재",
          loginId: "subject",
          studentId: "2024036068",
          grade: 1,
          graduateYear: 2027,
          memberAuthority: "WAITING_FOR_APPROVAL",
        },
      ];

      return users.map((user) => ({
        ...user,
        memberAuthority: AUTHORITY_ENG_TO_KOR[user.memberAuthority] ?? "-",
      }));
    },
    refetchOnWindowFocus: false,
  });
}

// REST: 회원가입 요청 승인
function useApproveReq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (signupReq) => {
      const approveReqURL = `${process.env.REACT_APP_SERVER}/manager/approve-signup`;
      //   axios
      //     .post(approveReqURL, {
      //       loginId: signupReq.loginId,
      //       memberAuthority: signupReq.memberAuthority,
      //     })
      //     .then(function (response) {
      //       console.log(response);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    },
    // 클라이언트 업데이트
    onMutate: (signupReq) => {
      queryClient.setQueryData(["signups"], (prevSignupReqs) =>
        prevSignupReqs?.filter(
          (prevSignupReq) => prevSignupReq.id !== signupReq.id
        )
      );
    },
  });
}

// REST: 회원가입 요청 미승인
function useDisapproveReq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (signupReq) => {
      const disapproveReqURL = `${process.env.REACT_APP_SERVER}/`;
      //   axios
      //     .post(disapproveReqURL)
      //     .then((response) => {
      //       console.log(response);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
    },
    // 클라이언트 업데이트
    onMutate: (signupReq) => {
      queryClient.setQueryData(["signups"], (prevSignupReqs) =>
        prevSignupReqs?.filter(
          (prevSignupReq) => prevSignupReq.id !== signupReq.id
        )
      );
    },
  });
}

export default SignupReqList;
