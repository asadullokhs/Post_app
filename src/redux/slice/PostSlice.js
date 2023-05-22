import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChange: false,
  isLoading: false,
  posts: null,
  error: null,
  currentPost: null,
};

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // getAllPosts Actions
    getAllPostsStart: (state, action) => {
      state.isLoading = true;
    },
    getAllPostsSuccess: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    getAllPostsFailure: (state, action) => {
      state.isLoading = false;
      state.error = "Cannot get all posts";
    },
    // ADD NEW POST ACTIONS
    createPostStart: (state, action) => {
      state.isLoading = true;
    },
    createPostSuccess: (state, action) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
    createPostFailure: (state, action) => {
      state.isLoading = false;
      state.error = "Cannot create post!";
    },
    // DELETE POST ACTION
    deletePostStart: (state) => {
      state.isLoading = true;
    },
    deletePostSuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
    deletePostFailure: (state) => {
      state.isLoading = false;
    },
    // UPDATE POST ACTION
    updatePostStart: (state) => {
      state.isLoading = true;
    },
    updatePostSuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
    updatePostFailure: (state) => {
      state.isLoading = false;
    },
    // GET USER POSTS ACTIONS
    getMyPostsStart: (state) => {
      state.isLoading = true;
    },
    getMyPostsSuccess: (state) => {
      state.isLoading = false;
    },
    getMyPostsFailure: (state) => {
      state.isLoading = false;
    },
    // get like
    getLikeStart: (state) => {
      state.isLoading = true;
    },
    getLikeSuccess: (state) => {
      state.isLoading = false;
      state.isChange = !state.isChange;
    },
    getLikeFailure: (state) => {
      state.isLoading = false;
    },
    // get Dislike
    getDislikeStart: (state) => {
      state.isLoading = true;
    },
    getDislikeSuccess: (state) => {
      state.isChange = !state.isChange;
      state.isLoading = false;
    },
    getDislikeFailure: (state) => {
      state.isLoading = false;
    },
    // GetCurrent Post
    getCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
  },
});
export const {
  getCurrentPost,
  getAllPostsStart,
  getAllPostsSuccess,
  getAllPostsFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  getMyPostsStart,
  getMyPostsSuccess,
  getMyPostsFailure,
  getLikeStart,
  getLikeSuccess,
  getLikeFailure,
  getDislikeStart,
  getDislikeSuccess,
  getDislikeFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
} = PostSlice.actions;
export default PostSlice.reducer;
