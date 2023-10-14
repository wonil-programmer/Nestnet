import { createSlice } from "@reduxjs/toolkit";

const initialFormState = {
  isEditing: false,
  fileInfo: [],
  title: "",
  bodyContent: "",
};

const formSlice = createSlice({
  name: "formReducer",
  initialState: initialFormState,
  reducers: {
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setFileInfo: (state, action) => {
      //   action.payload.forEach((file) => {
      //     state.fileInfo.push(file);
      //   });
      state.fileInfo = [...state.fileInfo, ...action.payload];
    },
    deleteFile: (state, action) => {
      //   state.fileInfo = state.fileInfo.filter(
      //     (file) => file.id !== action.payload
      //   );
      state.fileInfo.splice(
        state.fileInfo.findIndex((file) => file.id === action.payload),
        1
      );
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBodyContent: (state, action) => {
      state.bodyContent = action.payload;
    },
  },
});

export const {
  setIsEditing,
  setFileInfo,
  deleteFile,
  setTitle,
  setBodyContent,
} = formSlice.actions;
export default formSlice.reducer;
