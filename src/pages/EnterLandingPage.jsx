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
      <div>
        <div className="user-banner pt-6">
          <div
            style={{ display: "flex", justifyContent: "center", gap: "40px" }}
          >
            <button
              className="rounded-button-newuser"
              onClick={toggleLayer_1_2}
            >
              New User
            </button>


            <button className="rounded-button-rtnuser" onClick={returningUser}>Returning User</button>
          </div>

{/*     {isNewUser ? (
          <div className="login-background-container1">
            <div className="googlebuttondown">
              <div className="or-section">
                <button
                  className="google-button or-section mr-3"
                  onClick={signInWithGoogle}
                >
                  <img
                src={signupgoogle}
                alt="Sign up with Google"
                
      />
                </button>
              </div>
              <br></br>

              <div className="or-sectionrtn">
                <p className="font-bold text-lg or-sectionrtn">OR</p>
              </div>
              <div className="rounded-form">
                <input
                  type="text"
                  className="rounded-input"
                  placeholder="Email..."
                  onChange={handleEmailChangeNew}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="rounded-input"
                  onChange={handlePasswordChangeNew}
                />
              </div>
            </div>
            <div
              className={isOpen1 ? "login-overlay2" : "login-overlay1"}
            ></div>

{showOverlay3 && (
          <div className={`login-overlay3 ${showStyle ? 'ease-overlay' : ''}`}>
            <button className="rounded-button-newuser" onClick={handleSubmitSignUp}>
              Sign up with Email
{/* >>>>>>> main */}
{/*             </button> */} */}
          </div>

          {isNewUser ? (
            <div className="login-background-container1">
              <div className="googlebuttondown">
                <div className="or-section">
                  <button
                    className="google-button or-section"
                    onClick={signInWithGoogle}
                  >
                    <img src={signupgoogle} alt="Sign up with Google" />
                  </button>
                </div>
                <br></br>

                <div className="or-sectionrtn">
                  <p className="font-bold text-lg or-sectionrtn">Or</p>
                </div>
                <div className="rounded-form">
                  <input
                    type="text"
                    className="rounded-input"
                    placeholder="Email..."
                    onChange={handleEmailChangeNew}
                  />
                  <div className="errortxtnew">{errorMessage}</div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="rounded-input"
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
                  className={`login-overlay3 ${
                    showStyle ? "ease-overlay" : ""
                  }`}
                >
                  <button
                    className="rounded-button-newuser"
                    onClick={handleSubmitSignUp}
                    // style={{ transform: "translateY(-100px)" }}
                  >
                    Sign up Email/Password
                  </button>
                </div>
              )}
            </div>
//           ) : (
//             <div className="login-background-container2">
//               <div className="googlebuttondown">
//                 <div className="or-section">
//                   <button
//                     className="google-button or-section"
//                     onClick={signInWithGoogle}
//                   >
//                     <img src={continuegoogle} alt="Continue with Google" />
//                   </button>
//                 </div>
//                 <br></br>

//                 <div className="or-sectionnew">
//                   <p className="font-bold text-lg or-sectionnew">Or</p>
//                 </div>
//                 <div className="rounded-form">
//                   <input
//                     type="text"
//                     className="rounded-input"
//                     placeholder="Email..."
//                     onChange={handleEmailChangeReturning}
//                   />
//                   <div className="errortxtrtn">{errorMessage}</div>
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     className="rounded-input"
//                     onChange={handlePasswordChangeReturning}
//                   />
//                 </div>
//               </div>
//               <div
//                 className={isOpen1 ? "login-overlay2" : "login-overlay1"}
//               ></div>

//               {showOverlay3 && (
//                 <div
//                   className={`login-overlay3 ${
//                     showStyle ? "ease-overlay" : ""
//                   }`}
//                 >
//                   <button
//                     className="rounded-button-rtnuser"
//                     onClick={handleSubmitLogin}
//                     // style={{ transform: "translateY(-100px)" }}
//                   >
//                     Continue Email/Password
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
// <<<<<<< HEAD
//       </div>
//     </>
// =======
    ) : (
        <div className="login-background-container2">
            <div className="googlebuttondown">
              <div className="or-section">
              <button
                  className="google-button or-section mr-3"
                  onClick={signInWithGoogle}
                >
                  <img
            
                src={continuegoogle}
                alt="Continue with Google"
      />
                </button>
              </div>
              <br></br>

              <div className="or-sectionnew">
                <p className="font-bold text-lg or-sectionnew">OR</p>
              </div>
              <div className="rounded-form">
                <input
                  type="text"
                  className="rounded-input"
                  placeholder="Email..."
                  onChange={handleEmailChangeReturning}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="rounded-input"
                  onChange={handlePasswordChangeReturning}
                />
              </div>
            </div>
            <div
              className={isOpen1 ? "login-overlay2" : "login-overlay1"}
            ></div>

{showOverlay3 && (
          <div className={`login-overlay3 ${showStyle ? 'ease-overlay' : ''}`}>
            <button className="rounded-button-rtnuser" onClick={handleSubmitLogin}>
              Continue with Email
            </button>
          </div>
        )}
        </div>   
    )}
       </div>   
       </div>   
        
      </>
// >>>>>>> main
  );
};

export default EnterLandingPage;
