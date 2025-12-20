import React, { useEffect, useState } from "react";
import AuthContext from "../AuthContext/AuthContext";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import Loading from "../../components/Loading/Loading";

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

  // UPDATE USER PFOFILE
  const updaUserInfo = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      photoURL: photoURL,
      displayName: displayName,
    });
  };

  //   LOGOUT
  const logout = () => {
    setLoadingUser(true);
    return signOut(auth);
  };

  // DELETE USER PROFILE
  const deleteUserProfile = () => {
    return deleteUser(auth.currentUser);
  };

  if (loadingUser) {
    return <Loading></Loading>;
  }

  const authInfo = {
    registerUser,
    user,
    loadingUser,
    loginUser,
    loginWithGoogle,
    updaUserInfo,
    logout,
    deleteUserProfile,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
