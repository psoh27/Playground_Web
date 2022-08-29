import React, { useEffect, useState } from "react";
import { dbService } from "../fb_init";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { async } from "@firebase/util";
import Review from "../components/Review";

const Home = ({ userObj }) => {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [imgFile, setimgFile] = useState();

  useEffect(() => {
    const q = query(
      collection(dbService, "Reviews"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const reviewArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewArray);
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const doc = await addDoc(collection(dbService, "Reviews"), {
        review,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (error) {
      console.log("Error! :", error);
    }
    setReview("");
  };
  const onChange = (e) => {
    setReview(e.target.value);
  };
  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (eFinished) => {
      setimgFile(eFinished.currentTarget.result);
    };
    reader.readAsDataURL(file);
  };

  const onCancleImg = () => {
    setimgFile(null);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={review}
          placeholder="리뷰를 입력하세요! (일반 리뷰 등록 시 100원, 사진 리뷰 등록시 200원 적립됩니다.)"
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="등록" />
        {imgFile && (
          <div>
            <img src={imgFile} width="400px" height="400px" />
            <button onClick={onCancleImg}>취소</button>
          </div>
        )}
      </form>
      <div>
        {reviews.map((review) => (
          <Review
            key={review.id}
            reviewObj={review}
            isOwner={review.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
