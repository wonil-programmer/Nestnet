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
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { setFileInfo, deleteFile, setTitle, setDescription } =
  formSlice.actions;
export default formSlice.reducer;
