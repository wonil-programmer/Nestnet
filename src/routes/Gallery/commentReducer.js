import { createSlice } from "@reduxjs/toolkit";

const initialCommentState = {
  count: 0,
  comments: [],
  newComment: "",
};
const commentSlice = createSlice({
  name: "commentReducer",
  initialState: initialCommentState,
  reducers: {
    setCommentInput: (state, action) => {
      state.newComment = action.payload;
    },
    setComments: (state, action) => {
      state.count = action.payload.length;
      state.comments = action.payload;
      state.newComment = "";
    },
  },
});

export const { setCommentInput, setComments } = commentSlice.actions;
export default commentSlice.reducer;
