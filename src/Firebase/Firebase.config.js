// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyArgLrbFQQCROkV0Hv4Vou-8QIJMTLDcuw",
  authDomain: "ai-driven-business-tool.firebaseapp.com",
  projectId: "ai-driven-business-tool",
  storageBucket: "ai-driven-business-tool.firebasestorage.app",
  messagingSenderId: "692336317286",
  appId: "1:692336317286:web:85f509ca62ab33a5a02ea7",
  measurementId: "G-2NGTVWL2HS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export both
export { auth, db };
