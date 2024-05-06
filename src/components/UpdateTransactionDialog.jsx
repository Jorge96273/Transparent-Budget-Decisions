import { useEffect, useState, useRef } from "react";

import "../App.css";
import { Auth } from "./auth";
import { db, auth } from "../config/firebase";
import {
  addDoc,
  getDoc,
  collection,
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function UpdateTransactionDialog({
  uid,
  triggerFetch,
  transactionID,
  setTriggerFetch,
  accountList,
  setAccountList,
  budgetList,
  setBudgetList,
  accountNamesList,
}) {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDay = currentDate.getDate();
  let formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const [accountType, setAccountType] = useState("Debit");
  const [accountBalance, setAccountBalance] = useState(0);
  const [newTransactionName, setNewTransactionName] = useState("");
  const [newTransactionDate, setNewTransactionDate] = useState(formattedDate);
  const [newTransactionType, setNewTransactionType] = useState("Withdrawal");
  const [newTransactionAmount, setNewTransactionAmount] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState("No");
  const [selectBudget, setSelectBudget] = useState("None");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const accountRef = doc(db, `${uid}`, transactionID);
        const docSnap = await getDoc(accountRef);
        if (docSnap.exists()) {
          // Assuming the document structure matches the state variables
          setAccountType(docSnap.data().accountType);
          setAccountBalance(docSnap.data().accountBalance);
          setSelectBudget(docSnap.data().selectBudget);
          setNewTransactionName(docSnap.data().newTransactionName);
          setNewTransactionAmount(docSnap.data().newTransactionAmount);
          setNewTransactionDate(docSnap.data().newTransactionDate);
          setNewTransactionType(docSnap.data().newTransactionType);
          setMonthlyExpense(docSnap.data().monthlyExpense);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching transaction data: ", error);
      }
    };

    fetchTransactionData();
  }, [uid, transactionID]);

  //   const [updatedTransactionAmount, setUpdatedTransactionAmount] =
  //     useState(newTransactionAmount);

  const dialogKey = useRef(0);

  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogKey.current += 1;
  };
  const [isDialogOpen, setIsDialogOpen] = useState(true); //?variable to manage dialog box visibility

  const updateTransaction = async (id) => {
    try {
      const accountRef = doc(db, `${uid}`, id);

      let totalDeposits = 0;
      let totalWithdrawals = 0;
      if (accountList) {
        accountList.forEach((transaction) => {
          if (transaction.accountType === accountType) {
            if (transaction.newTransactionType === "Withdrawal") {
              totalWithdrawals += Number(transaction.newTransactionAmount);
            } else if (transaction.newTransactionType === "Deposit") {
              totalDeposits += Number(transaction.newTransactionAmount);
            }
          }
        });
      }
      let recordedBalance = totalDeposits - totalWithdrawals;
      let newBalance = recordedBalance;
      if (newTransactionType === "Withdrawal") {
        newBalance -= Number(newTransactionAmount);
      } else if (newTransactionType === "Deposit") {
        newBalance += Number(newTransactionAmount);
      }
      setAccountBalance(newBalance);

      await updateDoc(accountRef, {
        accountType: accountType,
        accountBalance: accountBalance,
        selectBudget: selectBudget,
        newTransactionName: newTransactionName,
        newTransactionAmount: newTransactionAmount,
        newTransactionDate: newTransactionDate,
        newTransactionType: newTransactionType,
        monthlyExpense: monthlyExpense,
        createdAt: serverTimestamp(),
      });

      setTriggerFetch(!triggerFetch);
      console.log("Document written with ID: ", docRef.id);
      closeDialog();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Transaction failed: ", error);
      toast.error("Failed to update transaction. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Disable the button
    try {
      await updateTransaction(transactionID);
      setIsLoading(false); // Re-enable the button
    } catch (error) {
      console.error("Transaction failed: ", error);
      toast.error("Failed to update transaction. Please try again.");
      setIsLoading(false); // Ensure the button is re-enabled even on failure
    }
  };

  return (
    <>
      <div className="App">
        <Dialog
          key={dialogKey.current}
          isOpen={isDialogOpen}
          onClose={closeDialog}
        >
          <DialogTrigger asChild>
            <button variant="outline" className="rounded-button-newuser">
              Update a Transaction
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update any Transaction Fields Below</DialogTitle>
            </DialogHeader>
            <h3>Update a Transaction</h3>
            <div>
              <label htmlFor="accountType">Account:</label>
              <select
                id="accountType"
                value={accountType}
                onChange={(event) => setAccountType(event.target.value)}
              >
                {accountNamesList.map((account) => (
                  <option key={account.accountName} value={account.accountName}>
                    {account.accountName}
                  </option>
                ))}
              </select>
              <br></br>
              <label htmlFor="budgetAccount">Budget Account:</label>
              <select
                id="budgetAccount"
                value={selectBudget}
                onChange={(event) => setSelectBudget(event.target.value)}
              >
                <option value="None">None</option>
                {budgetList.map((budget) => (
                  <option key={budget.id} value={budget.newBudget}>
                    {budget.newBudget}
                  </option>
                ))}
              </select>
              <br></br>
              <label htmlFor="accountType">Transaction Name:</label>
              <input
                type="text"
                value={newTransactionName}
                placeholder="Transaction Name"
                onChange={(e) => setNewTransactionName(e.target.value)}
              />
              <br></br>
              <label htmlFor="accountType">Transaction Amount:</label>
              <input
                type="number"
                value={newTransactionAmount}
                placeholder="Transaction Amount"
                onChange={(e) => setNewTransactionAmount(e.target.value)}
              />
              <br></br>
              <label htmlFor="accountType">Transaction Date:</label>
              <input
                aria-label="Date"
                type="date"
                value={newTransactionDate}
                placeholder="Transaction Date"
                onChange={(e) => setNewTransactionDate(e.target.value)}
              />
              <br></br>
              <label htmlFor="transactionType">Withdraw or Deposit:</label>
              <select
                id="transactionType"
                value={newTransactionType}
                onChange={(event) => setNewTransactionType(event.target.value)}
              >
                <option value="Withdrawal">Withdrawal</option>
                <option value="Deposit">Deposit</option>
              </select>
              <br></br>
              <label htmlFor="monthlyExpense">Monthly Transaction:</label>
              <select
                id="monthlyExpense"
                value={monthlyExpense}
                onChange={(event) => setMonthlyExpense(event.target.value)}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              <br></br>
            </div>
            {/* ******* END OF FORM */}
            <DialogFooter>
              <button
                className="rounded-button-newuser"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Update Transaction
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default UpdateTransactionDialog;
