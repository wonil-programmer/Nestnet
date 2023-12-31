import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import { FaHandshakeSimple, FaHandshakeSimpleSlash } from "react-icons/fa6";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const SignupList = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "성명",
        enableEditing: false,
      },
      {
        accessorKey: "memberAuthority",
        header: "권한",
        enableEditing: false,
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

// GET: 회원가입 목록 불러오기 api 요청
function useGetSignupReqs() {
  return useQuery({
    queryKey: ["signups"],
    queryFn: async () => {
      //   const allSignupReqsURL = `${process.env.REACT_APP_SERVER}/manager/signup-request`;
      //   const response = await axios.get(allSignupReqsURL);
      //   const users = response.data;
      const users = [
        {
          id: 1,
          name: "복학생",
          memberAuthority: "ADMIN",
        },
        {
          id: 2,
          name: "청년",
          memberAuthority: "PRESIDENT",
        },
        {
          id: 3,
          name: "이상한",
          memberAuthority: "VICE_PRESIDENT",
        },
        {
          id: 4,
          name: "아무개",
          memberAuthority: "MANAGER",
        },
        {
          id: 5,
          name: "홍길동",
          memberAuthority: "GRADUATED_MEMBER",
        },
      ];
      return users;
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

export default SignupList;
