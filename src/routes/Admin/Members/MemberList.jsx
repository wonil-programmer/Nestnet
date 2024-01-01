import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import {
  AUTHORITY_ENG_TO_KOR,
  AVAIL_AUTHORITY,
} from "../../../constant/Constant";

/**
 * 동아리원 목록 테이블
 */
const MemberList = ({ members }) => {
  const [validationErrors, setValidationErrors] = useState({});
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
        accessorKey: "emailAddress",
        header: "이메일",
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
        editVariant: "select",
        editSelectOptions: AVAIL_AUTHORITY,
        size: 50,
        maxSize: 50,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
    ],
    [validationErrors]
  );

  // call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  // call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  // call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  // 권한 수정 핸들러
  const handleSaveUser = async ({ values, table }) => {
    await updateUser(values);
    table.setEditingRow(null);
  };
  // 회원 탈퇴 핸들러
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("해당 동아리원을 정말 탈퇴시키시겠습니까?")) {
      deleteUser(row.original);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    editDisplayMode: "row",
    enableEditing: true,
    getRowId: (row) => row.id,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    initialState: { density: "compact" },
    // enableHiding: false,
    positionActionsColumn: "last",
    muiToolbarAlertBannerProps: isLoadingUsersError
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
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Tooltip title="수정">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="탈퇴">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

// GET: 동아리원 목록 조회 api
function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      //   const allMembersURL = `${process.env.REACT_APP_SERVER}/manager/member-info`;
      //   const response = await axios.get(allMembersURL);
      //   const users = response.data;

      const users = [
        {
          id: 1,
          name: "허원일",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "GENERAL_MEMBER",
        },
        {
          id: 2,
          name: "최유진",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "PRESIDENT",
        },
        {
          id: 3,
          name: "정한울",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "VICE_PRESIDENT",
        },
        {
          id: 4,
          name: "김성호",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "MANAGER",
        },
        {
          id: 5,
          name: "임상우",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "GRADUATED_MEMBER",
        },
        {
          id: 6,
          name: "허원일",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "ADMIN",
        },
        {
          id: 7,
          name: "최유진",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "PRESIDENT",
        },
        {
          id: 8,
          name: "정한울",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "VICE_PRESIDENT",
        },
        {
          id: 9,
          name: "김성호",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "MANAGER",
        },
        {
          id: 10,
          name: "임상우",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "GRADUATED_MEMBER",
        },
        {
          id: 11,
          name: "허원일",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "ADMIN",
        },
        {
          id: 12,
          name: "최유진",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "PRESIDENT",
        },
        {
          id: 13,
          name: "정한울",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "VICE_PRESIDENT",
        },
        {
          id: 14,
          name: "김성호",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "MANAGER",
        },
        {
          id: 15,
          name: "임상우",
          loginId: "wonza",
          emailAddress: "wonil@naver.com",
          studentId: "2019036068",
          grade: 3,
          graduateYear: 2025,
          memberAuthority: "GRADUATED_MEMBER",
        },
      ];
      const transformedUsers = users.map((user) => ({
        ...user,
        memberAuthority: AUTHORITY_ENG_TO_KOR[user.memberAuthority] ?? "-",
      }));

      return transformedUsers;
    },
    refetchOnWindowFocus: false,
  });
}

// POST: 동아리원 권한 수정 api
function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      const authorityChangeURL = `${process.env.REACT_APP_SERVER}/manager/change-authority`;
      //   axios
      //     .post(authorityChangeURL, {
      //       id: user.id,
      //       memberAuthority: user.memberAuthority,
      //     })
      //     .then(function (response) {
      //       console.log(response);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    },
    // 클라이언트 업데이트
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser
        )
      );
    },
  });
}

// DELETE: 동아리원 탈퇴 api
function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user) => {
      const deleteUserURL = `${process.env.REACT_APP_SERVER}/manager/member-withdraw/${user["member-id"]}`;
      //   axios
      //     .get(deleteUserURL)
      //     .then((response) => {
      //       console.log(response);
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
    },
    // 클라이언트 업데이트
    onMutate: (user) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.filter((prevUser) => prevUser.id !== user.id)
      );
    },
  });
}

export default MemberList;
