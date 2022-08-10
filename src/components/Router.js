import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../routes/Login";
import Home from "../routes/Home";
import navbar from "./nav_bar";

const AppRouter = ({ isLogin }) => (
  <Router>
    <Routes>
      {isLogin ? (
        <Route path="/" element={<Home />}></Route>
      ) : (
        <Route path="/" element={<Login />}></Route>
      )}
    </Routes>
  </Router>
);

export default AppRouter;
