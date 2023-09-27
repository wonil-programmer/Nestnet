import { createSlice } from "@reduxjs/toolkit";

const initialFormState = {
  fileInfo: [],
  title: "",
  description: "",
};

const formSlice = createSlice({
  name: "formReducer",
  initialState: initialFormState,
  reducers: {
    setFileInfo: (state, action) => {
      state.fileInfo = action.payload;
      // dispatch({
      //   type: "SET_FILEINFO",
      //   payload: [
      //     ...formState.fileInfo,
      //     ...Array.from(event.target.files).map((file) => ({ id: v4(), file })),
      //   ],
      // });
    },
    deleteFile: (state, action) => {
      state.filter((file) => file.id !== action.payload);
      // dispatch({
      //   type: "FILE_DELETE",
      //   payload: formState.fileInfo.filter(
      //     (fileInfo) => fileInfo?.id !== targetFileInfo?.id
      //   ),
      // });
    },
    setTitle: (state, action) => {
      state.title = action.payload;
      // let titleInputData = titleInputRef.current.value;
      // dispatch({ type: "SET_TITLE_INPUT", payload: titleInputData });
    },
    setDescription: (state, action) => {
      state.description = action.payload;
      // let descriptionInputData = descriptionInputRef.current.value;
      // dispatch({ type: "SET_DESCRIPTION_INPUT", payload: descriptionInputData });
    },
  },
});

export const { setFileInfo, deleteFile, setTitle, setDescription } =
  formSlice.actions;
export default formSlice.reducer;
