// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDcvoqny3d0BkU0ahg73o3PIs54dHvRTqk",
  authDomain: "react-netflix-clone-d64f3.firebaseapp.com",
  projectId: "react-netflix-clone-d64f3",
  storageBucket: "react-netflix-clone-d64f3.appspot.com",
  messagingSenderId: "30578014095",
  appId: "1:30578014095:web:52b1b90b1a62fb137f3dfa",
  measurementId: "G-4CBC93V2VQ"
};
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);