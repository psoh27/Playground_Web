import React, { useEffect, useRef, useState } from "react";
import { async } from "@firebase/util";
import Review from "../components/Review";
import { dbService, storageService } from "../fb_init";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import UploadReview from "../components/UploadReview";

const Home = ({ userObj }) => {
  const [reviews, setReviews] = useState([]);

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

  return (
    <div>
      <UploadReview userObj={userObj} />
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
