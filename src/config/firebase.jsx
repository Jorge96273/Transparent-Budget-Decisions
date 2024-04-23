// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdBAk8eYJKrU0fAg8nhY4DTYL4MlwDJWs",
  authDomain: "transparent-budget-decisions.firebaseapp.com",
  projectId: "transparent-budget-decisions",
  storageBucket: "transparent-budget-decisions.appspot.com",
  messagingSenderId: "788153143690",
  appId: "1:788153143690:web:9a51653b9220b5608db873",
  measurementId: "G-9DWNT15H4J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
