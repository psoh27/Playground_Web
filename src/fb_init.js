import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaedlAbra_tdNHO_JUHcgrexSzk9gNrvc",
  authDomain: "playground-app-b76a2.firebaseapp.com",
  projectId: "playground-app-b76a2",
  storageBucket: "playground-app-b76a2.appspot.com",
  messagingSenderId: "385603615764",
  appId: "1:385603615764:web:8ed3c8ee9730e34636bb01",
};

const app = initializeApp(firebaseConfig);
export const authService = getAuth();
