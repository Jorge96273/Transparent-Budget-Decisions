import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import "../App.css";
import { Auth } from "../components/auth";
import { db, auth } from "../config/firebase";
import { getDocs } from "firebase/firestore";
// gets multiple entries
import { getDoc } from "firebase/firestore";
// gets single entry
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { useNavigate, Navigate } from "react-router-dom";
import LoginDialogTemplate from "@/components/LoginDialogTemplate";
import SignupDialogTemplate from "@/components/SignupDialogTemplate";

function App() {
  const [accountList, setAccountList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // New Account State
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountBalence, setNewAccountBalence] = useState(0);
  const [isAccountDebt, setIsAccountDebt] = useState(false);

  // update state
  const [updatedBalence, setUpdatedBalence] = useState(0);

  const accountsCollectionRef = collection(db, "Accounts");

  useEffect(() => {
    // Firebase Auth state change listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true); // User is authenticated
        fetchAccounts(user.uid); // Fetch accounts for the authenticated user
      } else {
        setIsAuthenticated(false); // User is not authenticated
        console.log("User is not authenticated. Please log in to view accounts.");
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const fetchAccounts = async (userID) => {
    try {
      const data = await getDocs(collection(db, "Accounts"));
      const filteredData = data.docs
        .filter((doc) => doc.data().userID === userID) // Only fetch data for the authenticated user
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

      setAccountList(filteredData);
    } catch (err) {
      console.error("Error fetching account data:", err);
    }
  };

  const onSubmitAccount = async () => {
    try {
      await addDoc(accountsCollectionRef, {
        Name: newAccountName,
        Balence: newAccountBalence,
        Debt: isAccountDebt,
        userID: auth?.currentUser?.uid,
      });
      // getAccountList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAccount = async (id) => {
    const accountDoc = doc(db, "Accounts", id);
    await deleteDoc(accountDoc);
    // getAccountList();
  };

  const updateAccount = async (id) => {
    const accountDoc = doc(db, "Accounts", id);
    await updateDoc(accountDoc, { Balence: updatedBalence });
    // getAccountList();
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          type="text"
          placeholder=" Account Name"
          onChange={(e) => setNewAccountName(e.target.value)}
        />
        <input
          type="number"
          placeholder=" Account Balence"
          onChange={(e) => setNewAccountBalence(Number(e.target.value))}
        />

        <input
          type="checkbox"
          checked={isAccountDebt}
          onChange={(e) => setIsAccountDebt(Number(e.target.checked))}
        />
        <label>Debt</label>
        <button onClick={onSubmitAccount}>Submit Account</button>
      </div>
      <div>
        {accountList.map((account) => (
          <div key={account.id}>
            <h1 style={{ color: account.Debt ? "red" : "green" }}>
              {account.Name}
            </h1>
            <p>{account.Balence}</p>
            <button onClick={() => deleteAccount(account.id)}>
              Delete Account
            </button>
            <input
              placeholder="Updated Balence"
              type="number"
              onChange={(e) => setUpdatedBalence(e.target.value)}
            />
            <button onClick={() => updateAccount(account.id)}>
              Update Balence
            </button>
          </div>
        ))}
      </div>
      <LoginDialogTemplate />
      <SignupDialogTemplate />
    </div>
  );
}

export default App;
