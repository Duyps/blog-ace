import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCigUl4AycKnY71GzeW36sJT-zZHVphmpA",
    authDomain: "blog-1-a9de4.firebaseapp.com",
    projectId: "blog-1-a9de4",
    storageBucket: "blog-1-a9de4.firebasestorage.app",
    messagingSenderId: "403212330630",
    appId: "1:403212330630:web:5c709ad387d945c8061307",
    measurementId: "G-0HZZBGVRDB"
  };
// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, getDoc };
