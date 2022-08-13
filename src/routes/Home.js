import React, { useEffect, useState } from "react";
import { dbService } from "../fb_init";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

const Home = () => {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const getReview = async () => {
    const dbReviews = await getDocs(collection(dbService, "Reviews"));
    dbReviews.forEach((document) => {
      const reviewObject = {
        ...document.data(),
        id: document.id,
      };
      console.log(document.id, " => ", document.data());
      setReviews((prev) => [reviewObject, ...prev]);
    });
  };
  useEffect(() => {
    getReview();
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const doc = await addDoc(collection(dbService, "Reviews"), {
        review,
        createdAt: Date.now(),
      });
      console.log("This review written with ID: ", doc.id);
    } catch (error) {
      console.log("Error! :", error);
    }
    setReview("");
  };
  const onChange = (e) => {
    setReview(e.target.value);
  };
  console.log(reviews);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          value={review}
          placeholder="리뷰를 입력하세요! (일반 리뷰 등록 시 100원, 사진 리뷰 등록시 200원 적립됩니다.)"
        />
        <input type="submit" value="등록" />
      </form>
      <div>
        {reviews.map((review) => (
          <div key={review.id}>
            <h4>{review.review}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
