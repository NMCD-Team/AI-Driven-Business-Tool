// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCil4ib3ayfDa58FoX7egC8x5Kz1VGerik",
  authDomain: "nmcd-c4fcd.firebaseapp.com",
  projectId: "nmcd-c4fcd",
  storageBucket: "nmcd-c4fcd.firebasestorage.app",
  messagingSenderId: "201820105138",
  appId: "1:201820105138:web:a59580f26489dbf3c79cab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;