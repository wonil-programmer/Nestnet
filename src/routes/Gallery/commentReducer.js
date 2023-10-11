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
    deleteComment: (state, action) => {
      state.comments.splice(
        state.comments.findIndex((comment) => comment.id === action.payload),
        1
      );
    },
  },
});

export const { setCommentInput, setComments, deleteComment } =
  commentSlice.actions;
export default commentSlice.reducer;
