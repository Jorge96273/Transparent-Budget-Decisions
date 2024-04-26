import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export const useGetUserInfo = () => {
  const { name, profilePhoto, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { name, profilePhoto, userID, isAuth };
};

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //! Shows what user is signed in
  // console.log(auth?.currentUser?.email);
  // console.log(auth?.currentUser?.photoURL);
  //   ? handles if the object doesnt exist

  const { isAuth } = useGetUserInfo();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };
  const signin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      <Navigate to="/about/" />;
      if (isAuth) {
        return <Navigate to="/about/" />;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      if (isAuth) {
        return <Navigate to="/about/" />;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        {" "}
        Sign In With Google
      </button>
      <div>
        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register}>Register</button>
        <button onClick={signin}>Sign In</button>
      </div>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};
