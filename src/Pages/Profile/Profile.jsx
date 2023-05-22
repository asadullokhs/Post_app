import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { PostService } from "../../services/PostService";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard";
import Modal from "../../components/Modal";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { isChange, currentPost } = useSelector((state) => state.post);
  const [myPosts, setMyPosts] = useState(null);
  const [allLikes, setAllLikes] = useState(null);
  const [allComments, setAllComments] = useState(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const response = await PostService.getMyPosts(token);
      setMyPosts(response);

      let likes = 0;
      let comments = 0;
      response.forEach((item) => {
        likes += item.like.length;
        comments += item.comments.length;
      });
      setAllLikes(likes);
      setAllComments(comments);
    })();
  }, [isChange]);
  return (
    <div className="profile">
      <div className="container-fluid">
        <div className="content border-bottom">
          <div className="user-info">
            <img
              src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
              alt="img"
              className="img-fluid"
            />
            <div className="info">
              <h5 className="mt-2">
                {userInfo?.name} {userInfo?.surname}
              </h5>
              <p>{userInfo?.role}</p>
            </div>
            <ul className="list-unstyled d-flex gap-5 border-top pt-2 list-group-horizontal">
              <li className="list-group-item">
                <h6>{myPosts?.length}</h6>
                <p>posts</p>
              </li>
              <li className="list-group-item">
                <h6>{allLikes}</h6>
                <p>likes</p>
              </li>
              <li className="list-group-item">
                <h6>{allComments}</h6>
                <p>comments</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="row py-4">
          {myPosts &&
            myPosts.map((item, index) => {
              return <PostCard post={item} key={index} page="profile" />;
            })}
        </div>

        <Modal post={currentPost} />

        <Link className="profile-fixed" to="/add-post">
          <i className="fa-solid fa-plus"></i>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
