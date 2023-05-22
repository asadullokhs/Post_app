import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <header className="blog-header py-3 border-bottom">
      <div className="input-group">
        <input type="text" placeholder="Search user..." />
        <i className="fa-solid fa-search"></i>
      </div>
      <Link to="/add-post" className="btn">
        <i className="fa-solid fa-plus me-2"></i>
        <span>Create a new post</span>
      </Link>
      <ul className="list-unstyled list-group list-group-horizontal">
        <li className="list-group-item">
          <Link to="/" className="text-muted">
            <i className="fa-regular fa-paper-plane"></i>
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-muted">
            <i className="fa-regular fa-bell"></i>
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-muted">
            <i className="fa-solid fa-bars"></i>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
