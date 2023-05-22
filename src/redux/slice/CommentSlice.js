import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChange: false,
  isLoading: false,
  error: null,
};

const CommentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // ADD COMMENT ACTIONS
    createCommentStart: (state) => {
      state.isLoading = true;
    },
    createCommentSuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
    createCommentFailure: (state) => {
      state.isLoading = false;
      state.error = "Cannot add comment";
    },
    // Delete Comment actions
    deleteCommentStart: (state) => {
      state.isLoading = true;
    },
    deleteCommentSuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
    deleteCommentFailure: (state) => {
      state.isLoading = false;
    },
    // UPDATE COMMENT ACTIONS
    updateCommentStart: (state) => {
      state.isLoading = true;
    },
    updateCommentSuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
    updateCommentFailure: (state) => {
      state.isLoading = false;
    },
  },
});
export const {
  createCommentStart,
  createCommentSuccess,
  createCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailure,
} = CommentSlice.actions;
export default CommentSlice.reducer;
