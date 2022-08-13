import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../routes/Login";
import Home from "../routes/Home";
import Mypage from "../routes/Mypage";
import Navigation from "./Navigation";

const AppRouter = ({ isLogin }) => (
  <Router>
    {isLogin && <Navigation />}
    <Routes>
      {isLogin ? (
        <>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Mypage" element={<Mypage />}></Route>
        </>
      ) : (
        <Route path="/" element={<Login />}></Route>
      )}
    </Routes>
  </Router>
);

export default AppRouter;
