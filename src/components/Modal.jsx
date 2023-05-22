import React, { useState, useEffect } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import { useDispatch } from "react-redux";
import {
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
} from "../redux/slice/PostSlice";
import { PostService } from "../services/PostService";

const Modal = ({ post }) => {
  const dispatch = useDispatch();

  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState("");

  const handleUpdate = async (id) => {
    dispatch(updatePostStart());
    try {
      const formData = new FormData();
      formData.append("title", heading);
      formData.append("content", text);
      if (photo?.files) formData.append("image", photo.files[0]);
      const token = localStorage.getItem("token");
      const response = await PostService.updatePost(id, formData, token);
      dispatch(updatePostSuccess());
      console.log(response);
    } catch (error) {
      console.log(error);
      dispatch(updatePostFailure());
    }
  };

  useEffect(() => {
    setHeading(post?.title);
    setText(post?.content);
    setPhoto(post?.image.url);
  }, [post]);
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Update post
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex gap-3 flex-column">
            <Input value={heading} setValue={setHeading} label="Title" />
            <Textarea value={text} setValue={setText} label="Content" />
            <Input value={photo} setValue={setPhoto} type="file" />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => handleUpdate(post?._id)}
            >
              Update post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
