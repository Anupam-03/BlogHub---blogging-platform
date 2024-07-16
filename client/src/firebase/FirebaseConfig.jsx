// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAo29A8i8C0TM37o0O0jZAuRPXVCOKYzSA",
    authDomain: "myblog-408ac.firebaseapp.com",
    projectId: "myblog-408ac",
    storageBucket: "myblog-408ac.appspot.com",
    messagingSenderId: "882286143821",
    appId: "1:882286143821:web:97c1b4ca13789c8fc2ef04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {fireDb, auth, storage};