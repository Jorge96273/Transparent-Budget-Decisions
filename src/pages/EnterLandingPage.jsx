import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@/components/ui/button";

import signupgoogle from "../images/signupgoogle.png";
import continuegoogle from "../images/continuegoogle.png";

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

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    } else if (!/\d/.test(password)) {
      return "Password must contain at least 1 number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least 1 special character";
    } else if (/\s/.test(password)) {
      return "Password cannot contain spaces";
    } else {
      return "";
    }
  };

  const handlePasswordChangeNew = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    setErrorMessage(error);
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
    const error = validatePassword(password);
    try {
      if (error) {
        setErrorMessage(error);
      } else {
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

  const passwordInputRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const adjustOverlayHeight = () => {
      if (passwordInputRef.current && overlayRef.current) {
        const inputRect = passwordInputRef.current.getBoundingClientRect();
        overlayRef.current.style.top = `${inputRect.bottom}px`;
        overlayRef.current.style.height = `${inputRect.height}px`;
      }
    };

    adjustOverlayHeight(); // Initial adjust

    // Adjust on resize and on visual state changes
    const handleResize = () => adjustOverlayHeight();
    window.addEventListener("resize", handleResize);

    // Listen for transitions or animations to end (if applicable)
    const passwordInput = passwordInputRef.current;
    if (passwordInput) {
      passwordInput.addEventListener("transitionend", adjustOverlayHeight);
      passwordInput.addEventListener("animationend", adjustOverlayHeight);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (passwordInput) {
        passwordInput.removeEventListener("transitionend", adjustOverlayHeight);
        passwordInput.removeEventListener("animationend", adjustOverlayHeight);
      }
    };
  }, [isOpen1, isNewUser, showOverlay3]);

  const returningUser = () => {
    setIsOpen1(!isOpen1);
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

  return (
    <>
      <div className='animate-in fade-in duration-1000 bg-white'>
        <div className='user-banner bg-white pt-6'>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "40px" }}
          >
            <button
              className="rounded-full bg-slate-400 px-4 py-2 text-xl font-bold text-white shadow-slate-200 shadow-md hover:bg-slate-500"
              onClick={toggleLayer_1_2}
            >
              New User
            </button>

            <button className="rounded-full bg-slate-400 px-4 py-2 text-xl font-bold text-white shadow-slate-200 shadow-md hover:bg-slate-500" onClick={returningUser}>
              Returning User
            </button>
          </div>
        </div>

        {isNewUser ? (
          <div className='login-background-container1'>
            <div className='googlebuttondown'>
              <div className='or-section'>
                <button
                  className='google-button or-section'
                  onClick={signInWithGoogle}
                >
                  <img src={signupgoogle} alt='Sign up with Google' />
                </button>
              </div>
              <br></br>

              <div className='or-sectionrtn'>
                <p className='font-bold text-lg or-sectionrtn text-white'>OR</p>
              </div>
              <div className='rounded-form'>
                <input
                  type='text'
                  className='rounded my-1 px-4'
                  placeholder='Email...'
                  onChange={handleEmailChangeNew}
                />
                <div className='errortxtnew'>{errorMessage}</div>
                <input
                  type='password'
                  placeholder='Password'
                  className='rounded my-1 px-4'
                  onChange={handlePasswordChangeNew}
                />
              </div>
            </div>
            <div
              className={isOpen1 ? "login-overlay2" : "login-overlay1"}
            ></div>

            {showOverlay3 && (
              <div
                ref={overlayRef}
                className={`login-overlay3 ${showStyle ? "ease-overlay" : ""}`}
              >
                <button
                  className="rounded-full bg-slate-400 px-4 py-2 mb-10 text-xl font-bold text-white shadow-slate-200 shadow-md hover:bg-slate-500"
                  onClick={handleSubmitSignUp}
                >
                  Sign up with Email
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='login-background-container2'>
            <div className='googlebuttondown'>
              <div className='or-section'>
                <button
                  className='google-button or-section'
                  onClick={signInWithGoogle}
                >
                  <img src={continuegoogle} alt='Continue with Google' />
                </button>
              </div>
              <br></br>

              <div className='or-sectionnew'>
                <p className='font-bold text-lg or-sectionnew'>OR</p>
              </div>
              <div className='rounded-form'>
                <input
                  type='text'
                  className='rounded px-4 my-1'
                  placeholder='Email...'
                  onChange={handleEmailChangeReturning}
                />
                <div className='errortxtnew'>{errorMessage}</div>
                <input
                  type='password'
                  placeholder='Password'
                  className='rounded px-4 my-1'
                  onChange={handlePasswordChangeReturning}
                />
              </div>
            </div>
            <div
              className={isOpen1 ? "login-overlay2" : "login-overlay1"}
            ></div>

            {showOverlay3 && (
              <div
                className={`login-overlay3 ${showStyle ? "ease-overlay" : ""}`}
              >
                <button
                  className="rounded-full bg-slate-400 px-4 py-2 text-xl font-bold text-white shadow-slate-200 shadow-md hover:bg-slate-500"
                  onClick={handleSubmitLogin}
                >
                  Continue with Email
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EnterLandingPage;
