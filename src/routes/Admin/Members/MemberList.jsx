import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const AVAIL_AUTHORITY = ["ADMIN", "PRESIDENT", "VICE_PRESIDENT"];
// const data = [
//   {
//     name: "허원일",
//     memberAuthority: "ADMIN",
//   },
//   {
//     name: "최유진",
//     memberAuthority: "PRESIDENT",
//   },
//   {
//     name: "정한울",
//     memberAuthority: "VICE_PRESIDENT",
//   },
//   {
//     name: "김성호",
//     memberAuthority: "MANAGER",
//   },
//   {
//     name: "임상우",
//     memberAuthority: "GRADUATED_MEMBER",
//   },
// ];

const MemberList = ({ members }) => {
  const [validationErrors, setValidationErrors] = useState({});
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
        editVariant: "select",
        editSelectOptions: AVAIL_AUTHORITY,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        },
      },
    ],
    [validationErrors]
  );
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(row.original.id);
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
    muiToolbarAlertBannerProps: isLoadingUsersError
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
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
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
    // renderBottomToolbarCustomActions: ({ table }) => (
    //   <Button
    //     onClick={() => {
    //       const selectedRow = table.getSelectedRowModel().rows[0];
    //       const selectedId = selectedRow.original.name;
    //       setSelectedMember(selectedId);
    //       console.log(selectedMember);
    //     }}
    //   >
    //     권한 변경
    //   </Button>
    // ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      //   const allMembersURL = `${process.env.REACT_APP_SERVER}/manager/member-info`;
      //   const response = await axios.get(allMembersURL);
      //   const users = response.data;
      const users = [
        {
          name: "허원일",
          memberAuthority: "ADMIN",
        },
        {
          name: "최유진",
          memberAuthority: "PRESIDENT",
        },
        {
          name: "정한울",
          memberAuthority: "VICE_PRESIDENT",
        },
        {
          name: "김성호",
          memberAuthority: "MANAGER",
        },
        {
          name: "임상우",
          memberAuthority: "GRADUATED_MEMBER",
        },
      ];
      return users;
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      const changeAuthorityURL = `${process.env.REACT_APP_SERVER}/manager/change-authority`;
      console.log(user);
      //   axios
      //     .post(changeAuthorityURL, {
      //       id: user.id,
      //       memberAuthority: user.AVAIL_AUTHORITY,
      //     })
      //     .then(function (response) {
      //       console.log(response);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser
        )
      );
    },
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      const deleteUserURL = `${process.env.REACT_APP_SERVER}/manager/member-withdraw/${userId}`;
      axios
        .delete(deleteUserURL)
        .then((response) => {
          console.log(`Deleted post with ID ${userId}`);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //client side optimistic update
    onMutate: (userId) => {
      queryClient.setQueryData(["users"], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== userId)
      );
    },
  });
}

export default MemberList;
