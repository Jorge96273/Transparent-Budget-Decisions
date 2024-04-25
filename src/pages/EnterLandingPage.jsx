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
  // console.log(auth?.currentUser?.email);
  // console.log(auth?.currentUser?.photoURL);
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
        <div className="top-half">  
        <div className="login-container">
        <button className="rounded-button" onClick={signInWithGoogle}>
              Login/Sign Up with Google
            </button>
            <br></br>
            <p className="font-bold text-lg">OR</p>
          <div className="rounded-form">
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
          </div>
        </div>
        </div>
        <div className="bottom-half-login">
          <div className="column left-column">
            <p className="font-bold text-lg">Already have an account?</p>
            <button className="rounded-button" onClick={signin}>
              Email/Pword Login
            </button>
          </div>
          <div className="column right-column">
            <p className="font-bold text-lg">Don't have an account?</p>
            <button className="rounded-button" onClick={register}>
              Email/Pword Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterLandingPage;
