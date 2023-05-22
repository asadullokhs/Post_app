import React, { useState } from "react";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import "./AddPost.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostStart,
  createPostSuccess,
  createPostFailure,
} from "../../redux/slice/PostSlice";
import { PostService } from "../../services/PostService";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    dispatch(createPostStart());
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image.files[0]);
      const token = localStorage.getItem("token");
      const response = await PostService.createPost(formData, token);
      dispatch(createPostSuccess());
      navigate("/profile");
    } catch (error) {
      console.log(error);
      dispatch(createPostFailure());
    }
  };
  return (
    <div className="add-post">
      <div className="row">
        <div className="col-6">
          <h2 className="text-primary">Create a new post now</h2>
          <Input type="text" label="Title" value={title} setValue={setTitle} />
          <Textarea value={content} setValue={setContent} />
          <Input type="file" value={image} setValue={setImage} />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "creating..." : "create"}
          </button>
        </div>
        <div className="col-6 d-flex align-items-center">
          <div className="output-img">
            {image ? (
              <img src={URL.createObjectURL(image.files[0])} alt="rasm" />
            ) : (
              <label htmlFor="image" className="fa-solid fa-plus"></label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
