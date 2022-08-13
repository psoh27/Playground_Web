import React from "react";
import { authService, signOut } from "../fb_init";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogout}>로그아웃</button>
    </>
  );
};

export default Mypage;
