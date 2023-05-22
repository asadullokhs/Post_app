import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

const Comment = ({
  comment,
  handleDeleteComment,
  handleSaveChange,
  updateText,
  setUpdateText,
}) => {
  const [tempId, setTempId] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const { content, like, dislike, createdAt, updatedAt, author } = comment;
  const { _id, name, surname } = author[0];

  const handleEditStart = (id) => {
    setTempId(id);
  };

  return (
    <li className="list-group-item">
      <div className="border-bottom text-primary d-flex justify-content-between">
        <div>
          <i className="fa-solid fa-user me-2"></i>
          <small>
            {name} {surname}
          </small>
        </div>
        {userInfo?.id === _id ? (
          <div>
            {tempId === comment._id ? (
              <button
                className="btn btn-sm text-success"
                onClick={() => {
                  handleSaveChange(comment._id);
                  setTempId(null);
                }}
              >
                <i className="fa-solid fa-floppy-disk"></i>
              </button>
            ) : (
              <button
                className="btn btn-sm text-warning"
                onClick={() => handleEditStart(comment._id)}
              >
                <i className="fa-solid fa-pen"></i>
              </button>
            )}
            <button
              className="btn btn-sm text-danger"
              onClick={() => handleDeleteComment(comment._id)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {tempId === comment._id ? (
          <input
            type="text"
            value={updateText ? updateText : content}
            onChange={(e) => setUpdateText(e.target.value)}
            className="form-control mt-2"
          />
        ) : (
          <p className="m-0">{content}</p>
        )}
      </div>
    </li>
  );
};

export default Comment;
