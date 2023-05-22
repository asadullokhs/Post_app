import React, { useEffect } from "react";
import { PostService } from "../../services/PostService";
import { AuthService } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPostsFailure,
  getAllPostsStart,
  getAllPostsSuccess,
} from "../../redux/slice/PostSlice";
import {
  clearUserInfo,
  getUserInfoStart,
  getUserInfoSuccess,
  getUserInfoFailure,
} from "../../redux/slice/AuthSlice";
import PostCard from "../../components/PostCard";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Home.scss";

const Home = () => {
  const { posts, isChange } = useSelector((state) => state.post);
  const { userInfo, isToken, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlePosts = async () => {
    dispatch(getAllPostsStart());
    try {
      const posts = await PostService.getAllPosts();
      dispatch(getAllPostsSuccess(posts));
    } catch (error) {
      dispatch(getAllPostsFailure());
    }
  };

  const handleLogout = () => {
    dispatch(clearUserInfo());
    navigate("/login");
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
    handlePosts();
  }, [isChange]);
  return (
    <main>
      <aside>
        <div className="aside-content">
          <div className="logo">
            <Link to="/" className="text-decoration-none">
              <i className="fa-solid fa-bolt"></i>
              <span className="text-secondary">
                WEBSTA<p className="text-primary d-inline">GRAM</p>
              </span>
            </Link>
          </div>
          <div className="user-info">
            <img
              src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
              alt="img"
              className="img-fluid"
            />
            <div className="info">
              <Link to="/profile" className="text-muted text-decoration-none">
                <h5 className="mt-2">
                  {userInfo?.name} {userInfo?.surname}
                </h5>
              </Link>
              <p>{userInfo?.role}</p>
            </div>
          </div>
          <div className="navigation">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <i className="fa-solid fa-house"></i>
                <Link to="/">Home</Link>
              </li>
              <li className="list-group-item">
                <i class="fa-solid fa-cloud"></i>
                <Link to="/">Cloud</Link>
              </li>
              <li className="list-group-item">
                <i class="fa-regular fa-calendar-days"></i>
                <Link to="/">Marked</Link>
              </li>
              <li className="list-group-item">
                <i class="fa-solid fa-gear"></i>
                <Link to="/">Settings</Link>
              </li>
              <li className="list-group-item">
                <i class="fa-solid fa-circle-info"></i>
                <Link to="/">Support</Link>
              </li>
              <li className="list-group-item text-danger mt-4">
                <button onClick={handleLogout} className="btn text-danger">
                  <i class="fa-solid fa-arrow-right-from-bracket"></i> Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <article>
        <Navbar />
        <div className="row gap-4 py-4">
          {posts &&
            posts.map((item, index) => {
              return <PostCard post={item} key={index} />;
            })}
        </div>
      </article>
    </main>
  );
};

export default Home;
