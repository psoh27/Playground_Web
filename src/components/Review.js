import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { dbService, storageService } from "../fb_init";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { async } from "@firebase/util";

const Review = ({ reviewObj, isOwner }) => {
  const [edition, setEdition] = useState(false);
  const [newReview, setnewReview] = useState(reviewObj.review);
  const ReviewText = doc(dbService, "Reviews", `${reviewObj.id}`);
  const onDelete = async () => {
    const right = window.confirm("정말로 이 글을 삭제할까요?");
    if (right) {
      await deleteDoc(ReviewText);
      if (reviewObj.attachmentURL !== "") {
        await deleteObject(ref(storageService, reviewObj.attachmentURL));
      }
    }
  };
  const toggleEdit = () => {
    setEdition((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(ReviewText, {
      review: newReview,
    });
    setEdition(false);
  };
  const onChange = (event) => {
    setnewReview(event.target.value);
  };

  return (
    <div>
      {edition ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} value={newReview} required />
            <input type="submit" value="수정" />
          </form>
          <button onClick={toggleEdit}>취소</button>
        </>
      ) : (
        <>
          <h4>{reviewObj.review}</h4>
          {reviewObj.attachmentURL && (
            <img src={reviewObj.attachmentURL} width="400px" height="400px" />
          )}
          {isOwner && (
            <>
              <button onClick={toggleEdit}>수정</button>
              <button onClick={onDelete}>삭제</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Review;
