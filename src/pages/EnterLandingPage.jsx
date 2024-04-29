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
import { Button } from "@/components/ui/button";

const EnterLandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

  const handlePasswordChangeNew = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
    } else if (!/\d/.test(newPassword)) {
      setErrorMessage("Password must contain at least 1 number");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setErrorMessage("Password must contain at least 1 special character");
    } else if (/\s/.test(newPassword)) {
      setErrorMessage("Password cannot contain spaces");
    } else {
      setErrorMessage("");
    }
  };

  const handlePasswordChangeReturning = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleEmailChangeNew = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newEmail) {
      setErrorMessage("Email is required");
    } else if (!emailRegex.test(newEmail)) {
      setErrorMessage("Invalid email format");
    } else {
      setErrorMessage("");
    }
  };

  const handleEmailChangeReturning = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth?.currentUser?.email);
      console.log(`User: ${user}`);
      if (user) {
        navigate("/dashboard");
      }
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/invalid-email"
      ) {
        console.log(
          "Invalid credentials. Please check your email and password"
        );
        setErrorMessage(
          "Invalid credentials. Please check your email and password."
        );
      } else {
        console.log(err);
      }
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    try {
      if (password && !errorMessage) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log(auth?.currentUser?.email);
        console.log(`User: ${user}`);
        if (user) {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        console.log("This email is already in use.");
        setErrorMessage("This email is already in use.");
      } else if (err.code === "auth/invalid-email") {
        console.log("Please enter a valid email");
        setErrorMessage("Please enter a valid email");
      } else {
        console.log(err);
      }
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

  // Begin slider Functionality
  const [isOpen1, setIsOpen1] = useState(false);
  const [showOverlay3, setShowOverlay3] = useState(false);
  const [showStyle, setShowStyle] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);

//   const toggleUserType = () => {
//     setIsNewUser(!isNewUser);
//   };

const returningUser = () => {
    setIsOpen1(!isOpen1); // Toggle isOpen1 state immediately
    if (isOpen1) {
      setTimeout(() => {
        setIsNewUser(false);
      }, 1000);
    } else {
      setIsNewUser(false);
    }
  };

  const toggleLayer_1_2 = () => {
    setIsOpen1(!isOpen1); 
    if (isOpen1) {
      setTimeout(() => {
        setIsNewUser(true);
      }, 1000);
    } else {
      setIsNewUser(true);
    }
  };
  

  useEffect(() => {
    let timer;
    if (isOpen1) {
        timer = setTimeout(() => {
        setShowOverlay3(true);
        setShowStyle(true);
      }, 1000); // Delay of 1 second
      
    } else {
        setShowStyle(false);
        setTimeout(() => setShowOverlay3(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isOpen1]);

  //   const [rtnUser, setRtnUser] = useState(false);

  //   const toggleRtnUser = () => {
  //     setRtnUser(!rtnUser);
  //   };

  return (
    <>
      {/* <div className="page-container">
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
      </div> */}
      <div>
        <div className="user-banner">
          <div
            style={{ display: "flex", justifyContent: "center", gap: "100px" }}
          >
            <button className="rounded-button" onClick={toggleLayer_1_2}>
              New User
            </button>

            <button className="rounded-button" onClick={returningUser}>Returning User</button>
          </div>

    {isNewUser ? (
          <div className="login-background-container1">
            <div className="googlebuttondown">
              <div className="or-section">
                <button
                  className="rounded-button or-section"
                  onClick={signInWithGoogle}
                >
                  Sign up with Google
                </button>
              </div>
              <br></br>

              <div className="or-section">
                <p className="font-bold text-lg or-section">OR</p>
              </div>
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
            <div
              className={isOpen1 ? "login-overlay2" : "login-overlay1"}
            ></div>

{showOverlay3 && (
          <div className={`login-overlay3 ${showStyle ? 'ease-overlay' : ''}`}>
            <button className="rounded-button" onClick={handleSubmitSignUp}>
              Email/Pword Sign Up
            </button>
          </div>
        )}
        </div>
    ) : (
        <div className="login-background-container2">
            <div className="googlebuttondown">
              <div className="or-section">
                <button
                  className="rounded-button or-section"
                  onClick={signInWithGoogle}
                >
                  Login with Google
                </button>
              </div>
              <br></br>

              <div className="or-section">
                <p className="font-bold text-lg or-section">OR</p>
              </div>
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
            <div
              className={isOpen1 ? "login-overlay2" : "login-overlay1"}
            ></div>

{showOverlay3 && (
          <div className={`login-overlay3 ${showStyle ? 'ease-overlay' : ''}`}>
            <button className="rounded-button" onClick={handleSubmitLogin}>
              Email/Pword Login
            </button>
          </div>
        )}
        </div>   
    )}
       </div>   
       </div>   
        
      </>
  );
};

export default EnterLandingPage;
