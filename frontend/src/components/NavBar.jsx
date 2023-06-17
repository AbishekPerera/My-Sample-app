import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav">
      <h1>My Sample App</h1>
      <br />
      <div className="navbar-links">
        <ul>
          <li>
            <Link>HOME</Link>
          </li>
          <li>
            <Link>USER</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
