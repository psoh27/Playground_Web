import AppRouter from "./Router";
import React, { useState, useEffect } from "react";
import { authService } from "../fb_init";
import { updateProfile } from "firebase/auth";

function App() {
  const [initial, setInit] = useState(false);
  const [isLogin, setisLogin] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLogin(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (arg) =>
            updateProfile(user, { displayName: user.displayName }),
        });
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
      } else {
        setisLogin(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    setUserObj(authService.currentUser);
  };
  return (
    <AppRouter refreshUser={refreshUser} isLogin={isLogin} userObj={userObj} />
  );
}

export default App;
