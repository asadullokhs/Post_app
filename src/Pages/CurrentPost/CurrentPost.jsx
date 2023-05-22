import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostService } from "../../services/PostService";
import { CommentServices } from "../../services/CommentService";
import Loading from "../../components/Loading";
import "./CurrentPost.scss";
import moment from "moment";
import Comment from "../../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentStart,
  createCommentSuccess,
  createCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailure,
} from "../../redux/slice/CommentSlice";
import ImageExist from "../../components/ImageExist";
import {
  getUserInfoFailure,
  getUserInfoStart,
  getUserInfoSuccess,
} from "../../redux/slice/AuthSlice";
import { AuthService } from "../../services/AuthService";

const CurrentPost = () => {
  const navigate = useNavigate();
  const [updateText, setUpdateText] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isChange } = useSelector((state) => state.comment);
  const { isToken } = useSelector((state) => state.auth);
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const content_rf = useRef();

  const handleSaveChange = async (id) => {
    dispatch(updateCommentStart());
    try {
      const token = localStorage.getItem("token");
      const response = await CommentServices.updateComment(id, token, {
        content: updateText,
      });
      dispatch(updateCommentSuccess());
      console.log(response);
    } catch (error) {
      console.log(error);
      dispatch(updateCommentFailure());
    }
  };

  const handleDeleteComment = async (id) => {
    dispatch(deleteCommentStart());
    try {
      const token = localStorage.getItem("token");
      const response = await CommentServices.deleteComment(id, token);
      console.log(response);
      dispatch(deleteCommentSuccess());
    } catch (error) {
      console.log(error);
      dispatch(deleteCommentFailure());
    }
  };

  const handleComment = async () => {
    dispatch(createCommentStart());
    try {
      const comment = { postId: id, content: content_rf.current.value };
      const token = localStorage.getItem("token");
      const response = await CommentServices.addComment(comment, token);
      dispatch(createCommentSuccess());
      content_rf.current.value = "";
    } catch (error) {
      console.log(error);
      dispatch(createCommentFailure());
    }
  };

  const getUserInfoBegin = async (token) => {
    dispatch(getUserInfoStart());
    try {
      const response = await AuthService.getUser(token);
      dispatch(getUserInfoSuccess(response));
    } catch (error) {
      console.log(error);
      dispatch(getUserInfoFailure());
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfoBegin(token);
    }
  }, [isToken]);

  useEffect(() => {
    (async () => {
      const response = await PostService.getPostById(id);
      response[0] = {
        ...response[0],
        comments: response[0].comments.reverse(),
      };
      setPost(response[0]);
    })();
  }, [id, isChange]);
  return post ? (
    <div className="current-post">
      <div className="row">
        <div className="col-4">
          <div className="post-info">
            <h4>{post.title}</h4>
            <div className="owner d-flex align-items-center gap-2 border-bottom py-2">
              <div className="border rounded-circle">
                <i className="fa-solid fa-user"></i>
              </div>
              <h5>{post.author[0].name}</h5>
            </div>
            <p className="py-2">{post.content}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="post-img">
            {/* <img src={post.image.url} alt={post.title} className="img-fluid" /> */}
            <ImageExist url={post.image.url} />
            <span className="my-3 py-2 w-100 border-top d-flex justify-content-between">
              {moment(post.updatedAt ? post.updatedAt : post.createdAt).format(
                "L"
              )}
              <div>
                <i className="fa-solid fa-eye me-2"></i>
                {post.views}
              </div>
            </span>
          </div>
        </div>
        <div className="col-4">
          <div className="post-actions">
            <div className="input-group mb-3">
              <input
                ref={content_rf}
                type="text"
                className="form-control"
                placeholder="Send comment..."
              />
              <button
                onClick={handleComment}
                disabled={isLoading}
                className="input-group-text bg-primary text-white fa-solid fa-paper-plane"
              ></button>
            </div>
            <ul className="list-group">
              {post.comments.length > 0 ? (
                post.comments.map((item, index) => {
                  return (
                    <Comment
                      key={index}
                      comment={item}
                      handleDeleteComment={handleDeleteComment}
                      handleSaveChange={handleSaveChange}
                      updateText={updateText}
                      setUpdateText={setUpdateText}
                    />
                  );
                })
              ) : (
                <li className="list-group-item">no comments</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CurrentPost;
