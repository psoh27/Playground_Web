import React, { useEffect, useState } from "react";
import { authService, dbService, signOut } from "../fb_init";
import { useNavigate } from "react-router-dom";
import {
  doc,
  orderBy,
  where,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { async } from "@firebase/util";

const Mypage = ({ refreshUser, userObj }) => {
  const navigate = useNavigate();
  const onLogout = () => {
    authService.signOut();
    navigate("/");
  };
  const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);
  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  const getMyReviews = async () => {
    const myReviews = query(
      collection(dbService, "Reviews"),
      where("creatorId", "==", userObj.uid)
    );
    const querySanpshot = await getDocs(myReviews);
    querySanpshot.forEach((doc) => {
      console.log(doc.id, "=>", JSON.stringify(doc.data().review));
    });
  };
  useEffect(() => {
    getMyReviews();
  }, [userObj]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="수정할 이름을 입력하세요."
          value={newDisplayName}
        />
        <input type="submit" value="이름 수정하기" />
      </form>
      <button onClick={onLogout}>로그아웃</button>
    </>
  );
};

export default Mypage;
