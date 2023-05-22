import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slice/AuthSlice";
import PostSlice from "../slice/PostSlice";
import CommentSlice from "../slice/CommentSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    post: PostSlice,
    comment: CommentSlice,
  },
});

export default store;
