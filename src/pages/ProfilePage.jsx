import { useState, useEffect } from "react";
// import { auth } from "../config/firebase";
import {
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
  EmailAuthProvider,
  sendEmailVerification,
  getAuth,
  verifyBeforeUpdateEmail,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import userPhoto from "../images/userPhoto1.svg"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [password, setPassword] = useState("");

  const [displayName, setDisplayName] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword) {
      alert("Please enter your current password for authentication.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      if (email && email !== user.email) {
        verifyBeforeUpdateEmail(auth.currentUser, email).then(() => {
          alert("Email verification sent!");
          signOut(auth);
          navigate("/");
        });
        console.log("Prepare to update email after verification");
      }

      if (password) {
        await updatePassword(user, password);
        alert("Password updated successfully.");
      }

      if (displayName && displayName !== user.displayName) {
        await updateProfile(user, { displayName });
        alert("Display name updated successfully.");
      }
    } catch (error) {
      console.error(
        "Error during reauthentication or updating profile:",
        error
      );
      alert("Failed to update profile: " + error.message);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }


  return (
    <>
    
      <div className='animate-in slide-in-from-bottom w-full duration-1000 flex items-center flex-col my-2'>
        <div className="flex shadow-xl shadow-slate-300/70 rounded-3xl w-max bg-slate-400 p-4 flex-col center-items justify-center">
    <div className="flex flex-col justify-center items-center">

        <img
          className=' rounded-full w-40   bg-slate-200'
          src={user.photoURL? user.photoURL: userPhoto}
          referrerPolicy='no-referrer'
          ></img>
        <p>{user.displayName}</p>
        <p>{user.email}</p>
          </div>
        <form className='flex flex-col iems-center' onSubmit={handleSubmit}>
          <input
            className='rounded m-2 p-2'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='New Email'
            />
          <input
            className='rounded m-2 p-2'
            type='text'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder='New Display Name'
            />
          <input
            className='rounded m-2 p-2'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='New Password'
            />
          <div className='font-bold '>
            {" "}
            To make changes, enter current password below!
          </div>
          <input
            className='rounded m-2 p-2'
            type='password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder='Current Password'
            />
          <button
            className='rounded m-2 p-2 bg-teal-100 hover:bg-teal-300'
            type='submit'
            >
            Update Profile
          </button>
        </form>
            </div>
      </div>
    </>
  );
};

export default Profile;
