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
import TransactionTable from "@/components/TransactionTable";

function App() {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDay = currentDate.getDate();
  let formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;

  //! added trigger to prevent infinite loop for rerendering accounts
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [accountList, setAccountList] = useState([]);
  //!  Had to deconstruct to properly get user!!!!!
  const [user, loading] = useAuthState(auth);
  const uid = user?.uid; // Correctly get the uid from the user object
  const [accountType, setAccountType] = useState("Debit");
  const [accountBalance, setAccountBalance] = useState(0);
  const [newTransactionName, setNewTransactionName] = useState("");
  const [newTransactionDate, setNewTransactionDate] = useState(formattedDate);
  const [newTransactionType, setNewTransactionType] = useState("Withdrawl");
  const [newTransactionAmount, setNewTransactionAmount] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState("No");
  const [updatedTransactionAmount, setUpdatedTransactionAmount] =
    useState(newTransactionAmount);

  const firstRenderRef = useRef(true);

  const transactionCollectionRef = collection(db, `${uid}`);

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
    setAccountType("Debit"),
      // setAccountBalance(0),
      setNewTransactionName(""),
      setNewTransactionAmount(0),
      setNewTransactionDate(formattedDate),
      setNewTransactionType("Withdrawl"),
      setMonthlyExpense("No"),
      console.log("Document written with ID: ", docRef.id);
  };

  const getAccountList = async () => {
    try {
      const data = await getDocs(collection(db, `${uid}`));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAccountList(filteredData);
    } catch (err) {
      console.error("Error fetching account data:", err);
    }
  };

  const balance = async () => {
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    if (accountList) {
      console.log(accountList, "******** THIS IS THE ACCOUNT LIST ***********");
      accountList.forEach((transaction) => {
        console.log("******* THIS IS THE TRANSACTION ********", transaction);
        if (transaction.newTransactionType === "Withdrawl") {
          console.log("Withdral", transaction.newTransactionAmount);
          totalWithdrawals += Number(transaction.newTransactionAmount);
          console.log(totalWithdrawals);
        } else if (transaction.newTransactionType === "Deposit") {
          console.log("Deposit", transaction.newTransactionAmount);
          totalDeposits += Number(transaction.newTransactionAmount);
          console.log(totalDeposits);
        }
      });
    }

    const balance = totalDeposits - totalWithdrawals;
    console.log(balance);
    setAccountBalance(balance);
  };

  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, `${uid}`, id));
    toast.success("Account deleted successfully");
    setTriggerFetch(!triggerFetch);
  };

  const updateTransaction = async (id) => {
    const accountRef = doc(db, `${uid}`, id);
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
      getAccountList(), // Call getAccountList on subsequent renders
        balance();
    }
  }, [triggerFetch]);

  useEffect(() => {
    getAccountList(), // Call getAccountList on initial render
      balance();
  }, [user, accountType]);

  useEffect(() => {
    balance();
  }, [accountList]);
  return (
    <div className="App">
      <Auth />
      <h3>Add a Transaction</h3>
      <div>
        <label htmlFor="accountType">Account:</label>
        <select
          id="accountType"
          value={accountType}
          onChange={(event) => setAccountType(event.target.value)}
        >
          <option value="Debit">Debit</option>
          <option value="Credit">Credit</option>
          <option value="Savings">Savings</option>
        </select>

        <div>
          <label htmlFor="accountBalance">Current Account Balance:</label>
          <span id="accountBalance">{accountBalance.toFixed(2)}</span>
        </div>
        <input
          type="text"
          placeholder="Transaction Name"
          onChange={(e) => setNewTransactionName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Transaction Amount"
          onChange={(e) => setNewTransactionAmount(e.target.value)}
        />
        <input
          aria-label="Date"
          type="date"
          placeholder="Transaction Date"
          onChange={(e) => setNewTransactionDate(e.target.value)}
        />

        <label htmlFor="transactionType">Withdraw or Deposit:</label>
        <select
          id="transactionType"
          value={newTransactionType}
          onChange={(event) => setNewTransactionType(event.target.value)}
        >
          <option value="Withdrawl">Withdrawl</option>
          <option value="Deposit">Deposit</option>
        </select>

        <label htmlFor="monthlyExpense">Monthly Expense:</label>
        <select
          id="monthlyExpense"
          value={monthlyExpense}
          onChange={(event) => setMonthlyExpense(event.target.value)}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
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
                Account: {transaction.accountType} | Previous Account Balence: $
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
      <TransactionTable />
    </div>
  );
}

export default App;
