import React, { useEffect, useState } from "react";
import AuthContext from "../AuthContext/AuthContext";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  //   REGISTER EP
  const registerUser = (email, password) => {
    setLoadingUser(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   SIGNIN EP
  const loginUser = (email, password) => {
    setLoadingUser(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   GOOGLE LOGIN
  const loginWithGoogle = () => {
    setLoadingUser(true);
    return signInWithPopup(auth, googleProvider);
  };

  //   LOGOUT
  const logout = () => {
    signOut(auth);
  };

  const authInfo = {
    registerUser,
    user,
    loadingUser,
    loginUser,
    loginWithGoogle,
    logout,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
