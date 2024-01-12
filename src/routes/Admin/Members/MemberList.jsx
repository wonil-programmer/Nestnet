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
  AUTHORITY_KOR_TO_ENG,
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
  const handleSaveUser = async ({ row, values, table }) => {
    const updateMemberId = row.id;
    await updateUser({ updateMemberId, updateValues: values });
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

// REST: 동아리원 목록 조회
function useGetUsers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const allMembersURL = `${process.env.REACT_APP_SERVER}/manager/member-info`;
      return await axios.get(allMembersURL).then((res) => {
        const members = res.data.response.dtoList;

        return members.map((member) => ({
          ...member,
          memberAuthority: AUTHORITY_ENG_TO_KOR[member.memberAuthority] ?? "-",
        }));
      });
    },
    refetchOnWindowFocus: false,
  });
}

// REST: 동아리원 권한 수정
function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ updateMemberId, updateValues }) => {
      const authorityChangeURL = `${process.env.REACT_APP_SERVER}/manager/change-authority`;
      return await axios.post(authorityChangeURL, {
        id: updateMemberId,
        memberAuthority: AUTHORITY_KOR_TO_ENG[updateValues.memberAuthority],
      });
    },
    // 클라이언트 업데이트
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["members"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser
        )
      );
    },
  });
}

// REST: 동아리원 탈퇴
function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (member) => {
      const deleteMemberURL = `${process.env.REACT_APP_SERVER}/manager/member-withdraw?member-id=${member.id}`;
      return await axios.delete(deleteMemberURL);
    },
    // 클라이언트 업데이트
    onMutate: (member) => {
      queryClient.setQueryData(["members"], (prevMembers) =>
        prevMembers?.filter((prevMember) => prevMember.id !== member.id)
      );
    },
  });
}

export default MemberList;
