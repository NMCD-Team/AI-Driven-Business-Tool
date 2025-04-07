import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')

  // user Register method
  const userRegister = (email, password) => {
    setLoading(false)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // User Login method
  const userLogin = (email, password) => {
    setLoading(false)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userGoogleLogin = () =>{
    setLoading(false)
        return signInWithPopup(auth , provider)
  }

  const userLogout = () =>{
    setLoading(false)
    return signOut(auth)
  }

  const UpdateUserProfile = (updateData) =>{
      return updateProfile(auth.currentUser, updateData)
  }

  const userForgePassword = (email) =>{
    return sendPasswordResetEmail(auth, email)
  }
  //
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false)
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    userRegister,
    userLogin,
    user,
    userLogout,
    userGoogleLogin,
    loading,
    UpdateUserProfile,
    userForgePassword,
    setEmail,email,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Provider;
