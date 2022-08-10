import { async } from "@firebase/util";
import { authService } from "../fb_init";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Login = () => {
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
  const loginGoogle = async (e) => {
    let provider;
    if (e.target.name === "google") {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          아이디(이메일)
          <input
            onChange={onChange}
            name="email"
            type="text"
            placeholder="playground@play.com"
            value={email}
            required
          />
        </label>
        <label>
          비밀번호
          <input
            onChange={onChange}
            name="password"
            type="password"
            value={password}
            required
          />
        </label>
        <input type="submit" value={account ? "계정 만들기" : "로그인"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{account ? "로그인" : "계정 만들기"}</span>
      <div>
        <button name="google" onClick={loginGoogle}>
          구글 아이디로 로그인하기
        </button>
      </div>
    </div>
  );
};
export default Login;
