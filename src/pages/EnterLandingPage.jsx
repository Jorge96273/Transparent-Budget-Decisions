import { Link } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const EnterLandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  //! Shows what user is signed in
  console.log(auth?.currentUser?.email);
  console.log(auth?.currentUser?.photoURL);
  //   ? handles if the object doesnt exist

  const signin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth?.currentUser?.email);
      console.log(`User: ${user}`);
      if (user) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(auth?.currentUser?.email);
      console.log(`User: ${user}`);
      if (user) {
        console.log("User is signed in");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(auth?.currentUser?.email);
      console.log(`User: ${user}`);
      if (user) {
        console.log("User is signed in");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <div className="page-container">
        EnterLandingPage
        <div className="top-half">
          <div className="rounded-form">
            <p className="font-bold text-lg">Already have an account?</p>

            <input
              type="text"
              className="rounded-input"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="rounded-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="rounded-button" onClick={signin}>
              Login
            </button>
            <p className="font-bold text-lg">OR</p>
            <button className="rounded-button" onClick={signInWithGoogle}>
              Login with Google
            </button>
          </div>
        </div>
        <div className="bottom-half">
          <p className="font-bold text-lg">Don't have an account?</p>
          <button className="rounded-button" onClick={register}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default EnterLandingPage;
