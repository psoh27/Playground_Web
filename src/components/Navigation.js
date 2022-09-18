import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/Mypage">{userObj.displayName}님의 페이지</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
