import { useEffect, useState, useRef } from "react";

import "../App.css";
import { Auth } from "../components/auth";
import { db, auth } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate, Navigate } from "react-router-dom";
import LoginDialogTemplate from "@/components/LoginDialogTemplate";
import SignupDialogTemplate from "@/components/SignupDialogTemplate";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

function App() {
  //! added trigger to prevent infinite loop for rerendering accounts
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [accountList, setAccountList] = useState([]);
  //!  Had to deconstruct to properly get user!!!!!
  const [user, loading] = useAuthState(auth);
  const uid = user?.uid; // Correctly get the uid from the user object
  const [accountType, setAccountType] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [newTransactionName, setNewTransactionName] = useState("");
  const [newTransactionDate, setNewTransactionDate] = useState("");
  const [newTransactionType, setNewTransactionType] = useState("withdrawl");
  const [newTransactionAmount, setNewTransactionAmount] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(false);
  const [updatedTransactionAmount, setUpdatedTransactionAmount] =
    useState(newTransactionAmount);

  const firstRenderRef = useRef(true);

  const transactionCollectionRef = collection(
    db,
    `${uid}/SAVINGS/transactions`
  );

  const addTransaction = async () => {
    const docRef = await addDoc(transactionCollectionRef, {
      accountType,
      accountBalance,
      newTransactionName,
      newTransactionAmount,
      newTransactionDate,
      newTransactionType,
      monthlyExpense,
      //   !NEED TO FIX TIMESTAMP
      createdAt: serverTimestamp(),
    });
    setTriggerFetch(!triggerFetch);
    setAccountType(""),
      setAccountBalance(0),
      setNewTransactionName(""),
      setNewTransactionAmount(0),
      setNewTransactionDate(""),
      setNewTransactionType(""),
      setMonthlyExpense(false),
      console.log("Document written with ID: ", docRef.id);
  };

  const getAccountList = async () => {
    try {
      const data = await getDocs(collection(db, `${uid}/SAVINGS/transactions`));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAccountList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, `${uid}/SAVINGS/transactions`, id));
    toast.success("Account deleted successfully");
    setTriggerFetch(!triggerFetch);
  };

  const updateTransaction = async (id) => {
    const accountRef = doc(db, `${uid}/SAVINGS/transactions`, id);
    await updateDoc(accountRef, {
      newTransactionAmount: updatedTransactionAmount,
    });
    toast.success("Account balance updated successfully");
    setTriggerFetch(!triggerFetch);
  };
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false; // Bypass the initial render
    } else {
      getAccountList(); // Call getAccountList on subsequent renders
    }
  }, [triggerFetch]);

  useEffect(() => {
    getAccountList(); // Call getAccountList on initial render
  }, [user]);
  return (
    <div className="App">
      <Auth />
      <h3>Add a Transaction</h3>
      <div>
        <input
          type="text"
          placeholder="Account Type"
          onChange={(e) => setAccountType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Account Balence"
          onChange={(e) => setAccountBalance(e.target.value)}
        />
        <input
          type="text"
          placeholder="Transaction Name"
          onChange={(e) => setNewTransactionName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Transaction Amount"
          onChange={(e) => setNewTransactionAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Transaction Date"
          onChange={(e) => setNewTransactionDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Withdrawl or Deposit"
          onChange={(e) => setNewTransactionType(e.target.value)}
        />
        <input
          type="checkbox"
          checked={monthlyExpense}
          //   onChange={(e) => setMonthlyExpense(e.target.checked)}
          onChange={(e) => setMonthlyExpense(Number(e.target.checked))}
        />
        <label>Monthly Expense </label>
        <></>
        <Button onClick={addTransaction}>Submit Account</Button>
      </div>
      <h3>Transaction History</h3>
      <div>
        {accountList.map((transaction) => (
          <div key={transaction.id}>
            <p
              style={{
                color:
                  transaction.newTransactionType === "Withdrawl"
                    ? "red"
                    : "green",
              }}
            >
              <span>
                Account: {transaction.accountType} | Account Balence: $
                {transaction.accountBalance}| Transaction:{" "}
                {transaction.newTransactionName} | Transaction Amount: $
                {transaction.newTransactionAmount}| Transaction Date:{" "}
                {transaction.newTransactionDate} | Transaction Type:{" "}
                {transaction.newTransactionType} | Monthly Expense:{" "}
                {transaction.monthlyExpense} |
              </span>
            </p>
            <Button onClick={() => deleteTransaction(transaction.id)}>
              Delete Account
            </Button>
            <input
              placeholder="Updated Balance"
              type="number"
              onChange={(e) =>
                setUpdatedTransactionAmount(Number(e.target.value))
              }
            />
            <Button onClick={() => updateTransaction(transaction.id)}>
              Update Balance
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
