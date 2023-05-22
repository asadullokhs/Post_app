import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  getLikeStart,
  getLikeSuccess,
  getLikeFailure,
  getDislikeStart,
  getDislikeSuccess,
  getDislikeFailure,
  getCurrentPost,
} from "../redux/slice/PostSlice";
import { PostService } from "../services/PostService";
import ImageExist from "./ImageExist";
import Modal from "./Modal";
import "./PostCard.scss";

const PostCard = ({ post, page = "home" }) => {
  const [isClick, setIsClick] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.post);
  const {
    _id,
    content,
    title,
    like,
    dislike,
    views,
    image,
    comments,
    author,
    authorId,
  } = post;
  const { name } = author[0];
  const { url } = image;

  const handleDelete = async (id) => {
    dispatch(deletePostStart());
    try {
      const token = localStorage.getItem("token");
      const response = await PostService.deletePost(id, token);
      console.log(response);
      dispatch(deletePostSuccess());
    } catch (error) {
      console.log(error);
      dispatch(deletePostFailure());
    }
  };

  const toggleLike = async (id) => {
    setIsClick(!isClick);
    dispatch(getLikeStart());
    try {
      const token = localStorage.getItem("token");
      await PostService.getLike(id, token);
      dispatch(getLikeSuccess());
    } catch (error) {
      console.log(error);
      dispatch(getLikeFailure());
    }
  };

  const toggleDislike = async (id) => {
    dispatch(getDislikeStart());
    try {
      const token = localStorage.getItem("token");
      await PostService.getDislike(id, token);
      dispatch(getDislikeSuccess());
    } catch (error) {
      console.log(error);
      dispatch(getDislikeFailure());
    }
  };

  return (
    <div className={page === "home" ? "col-12" : "col-4"}>
      <div className="card shadow-sm h-100">
        {/* <img src={url} alt={title} className="card-img-top img-fluid" /> */}
        <ImageExist url={url} />
        {page === "profile" ? (
          <div className="profile-option">
            <button
              className="btn btn-sm btn-warning"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => dispatch(getCurrentPost(post))}
            >
              <i className="fa-solid fa-pen"></i>
            </button>
            <button
              onClick={() => handleDelete(_id)}
              type="button"
              disabled={isLoading}
              className="btn btn-sm btn-danger"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="card-body">
          <h4>{title}</h4>
          <h6>
            <i className="fa-solid fa-user me-3"></i>
            {name}
          </h6>
          <p
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            className="card-text"
          >
            {content}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link
              to={`/post/${_id}`}
              type="button"
              className="text-primary btn-link text-decoration-none"
            >
              See more...
            </Link>
          </div>
          <div className="d-flex gap-3">
            <small className="text-muted btn" onClick={() => toggleLike(_id)}>
              <i
                className={`fa-solid fa-thumbs-up me-2 ${
                  isClick ? "text-danger" : "text-dark"
                }`}
              ></i>
              {like.length}
            </small>
            <small
              className="text-muted btn"
              onClick={() => toggleDislike(_id)}
            >
              <i className="fa-solid fa-thumbs-down me-2"></i>
              {dislike.length}
            </small>
            <small className="text-muted btn">
              <i className="fa-solid fa-comment me-2"></i>
              {comments.length}
            </small>
            <small className="text-muted text-primary btn">
              <i className="fa-solid fa-eye me-2"></i>
              {views}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
