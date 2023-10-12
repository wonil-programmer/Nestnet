import { createSlice, current } from "@reduxjs/toolkit";

const initialCommentState = {
  count: 0,
  comments: [],
  newComment: "",
  selectedCommentId: 0,
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
    setEditCommentInput: (state, action) => {
      state.editedComment = action.payload;
    },
    setSelectedCommentId: (state, action) => {
      state.selectedCommentId = action.payload;
    },
    editComment: (state, action) => {
      let targetIndex = action.payload.targetIndex;
      let newContent = action.payload.newContent;
      const updateComments = state.comments.map((comment) => {
        if (comment.id === targetIndex) {
          return { ...comment, content: newContent };
        }
        return comment;
      });
      state.comments = updateComments;
    },
  },
});

export const {
  setCommentInput,
  setEditCommentInput,
  setComments,
  deleteComment,
  setSelectedCommentId,
  editComment,
} = commentSlice.actions;
export default commentSlice.reducer;
