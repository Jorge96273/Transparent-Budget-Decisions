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

import { DonutChart, Legend } from '@tremor/react';


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



  const sales = [
    {
      name: 'New York',
      sales: 980,
    },
    {
      name: 'London',
      sales: 456,
    },
    {
      name: 'Hong Kong',
      sales: 390,
    },
    {
      name: 'San Francisco',
      sales: 240,
    },
    {
      name: 'Singapore',
      sales: 190,
    },
  ];
  
  const valueFormatter = (number) =>
    `$ ${Intl.NumberFormat('us').format(number).toString()}`;
  

  return (
    <>
    
      <div className='animate-in slide-in-from-bottom duration-1000 flex items-center flex-col'>
        <img
          className='rounded-full w-40'
          src={user.photoURL}
          referrerPolicy='no-referrer'
        ></img>
        <p>{user.displayName}</p>
        <p>{user.email}</p>
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
            className='rounded m-2 p-2 bg-teal-400 hover:bg-teal-500'
            type='submit'
          >
            Update Profile
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center space-x-6">
        <DonutChart
          data={sales}
          category="sales"
          index="name"
          valueFormatter={valueFormatter}
          colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
          className="w-40"
        />
        <Legend
          categories={['New York', 'London', 'Hong Kong', 'San Francisco', 'Singapore']}
          colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
          className="max-w-xs"
        />
      </div>

    </>
  );
};

export default Profile;
