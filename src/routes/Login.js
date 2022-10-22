import { authService } from "../fb_init";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import LoginForm from "../components/LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  const loginGoogle = async (e) => {
    let provider;
    if (e.target.name === "google") {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <div className="Login">
      <div className="title">
        <h1>놀이터</h1>

        <LoginForm />
        <div className="googleLogin">
          <button name="google" onClick={loginGoogle}>
            <FontAwesomeIcon icon={faGoogle} />
            Sign in With Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
