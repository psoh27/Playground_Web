import React, { useState, useEffect } from "react";
import Login from "../routes/Login";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "../fb_init";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      if (account) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setAccount((prev) => !prev);
  };
  return (
    <>
      <div className="Login">
        <form onSubmit={onSubmit} className="loginForm">
          <label className="login_input">
            <input
              onChange={onChange}
              name="email"
              type="text"
              placeholder="이메일"
              value={email}
              required
            />
          </label>
          <label className="login_input">
            <input
              onChange={onChange}
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              required
            />
          </label>
          <input
            className="login_signIn"
            type="submit"
            value={account ? "계정 만들기" : "로그인"}
          />
          {error && <span className="loginError">{error}</span>}
          <span onClick={toggleAccount} className="loginChange">
            {account ? "로그인" : "계정 만들기"}
          </span>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
