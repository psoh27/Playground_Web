import AppRouter from "./Router";
import React, { useState, useEffect } from "react";
import { authService } from "../fb_init";

function App() {
  const [initial, setInit] = useState(false);
  const [isLogin, setisLogin] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLogin(true);
        setUserObj(user);
      } else {
        setisLogin(false);
      }
      setInit(true);
    });
  }, []);
  return <AppRouter isLogin={isLogin} userObj={userObj} />;
}

export default App;
