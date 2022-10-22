import React, { useEffect, useRef, useState } from "react";
import { dbService, storageService } from "../fb_init";
import { v4 as uuidv4 } from "uuid"; //식별자 아이디를 생성해준다.
import { uploadString, ref, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const UploadReview = ({ userObj }) => {
  const [review, setReview] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentURL = await getDownloadURL(response.ref);
    }
    const replyObj = {
      review,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    };
    await addDoc(collection(dbService, "Reviews"), replyObj);
    setReview("");
    setAttachment("");
  };
  const onChange = (e) => {
    setReview(e.target.value);
  };
  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (eFinished) => {
      setAttachment(eFinished.currentTarget.result);
    };
    reader.readAsDataURL(file);
  };

  const onCancleImg = () => {
    setAttachment("");
    fileInput.current.value = "";
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        type="text"
        value={review}
        placeholder="리뷰를 입력하세요! (일반 리뷰 등록 시 100원, 사진 리뷰 등록시 200원 적립됩니다.)"
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
      />
      <input type="submit" value="등록" />
      {attachment && (
        <div>
          <img src={attachment} width="400px" height="400px" />
          <button onClick={onCancleImg}>취소</button>
        </div>
      )}
    </form>
  );
};
export default UploadReview;
