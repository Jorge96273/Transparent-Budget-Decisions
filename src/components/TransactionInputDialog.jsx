import { useState, useRef } from "react";
import "../App.css";
import { db } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  onSnapshot,
} from "firebase/firestore";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function TransactionInputDialog({
  uid,
  triggerFetch,
  setTriggerFetch,
  accountList,
  setAccountList,
  budgetList,
  setBudgetList,
  accountNamesList,
  getAccountNames,
}) {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDay = currentDate.getDate();
  let formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const [accountType, setAccountType] = useState("Debit");
  const [newTransactionName, setNewTransactionName] = useState("");
  const [newTransactionDate, setNewTransactionDate] = useState(formattedDate);
  const [newTransactionType, setNewTransactionType] = useState("Withdrawal");
  const [newTransactionAmount, setNewTransactionAmount] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState("No");
  const transactionCollectionRef = collection(db, `${uid}`);
  const [isDialogOpen, setIsDialogOpen] = useState(true); //?variable to manage dialog box visibility
  const dialogKey = useRef(0);

  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogKey.current += 1;
  };
  const addTransaction = async () => {
    try {
      // Calculate the new balance directly
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

      const docRef = await addDoc(transactionCollectionRef, {
        accountType,
        accountBalance: newBalance, // Use the calculated new balance here
        selectBudget,
        newTransactionName,
        newTransactionAmount,
        newTransactionDate,
        newTransactionType,
        monthlyExpense,
        createdAt: serverTimestamp(),
      });
      setTriggerFetch(!triggerFetch);
      console.log("Document written with ID: ", docRef.id);
      closeDialog();

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };
  const [selectBudget, setSelectBudget] = useState("None");
  const budgetCollectionRef = collection(db, `budget/${uid}/newBudget`);

  return (
    <>
      <div className="App">
        <Dialog
          key={dialogKey.current}
          isOpen={isDialogOpen}
          onClose={closeDialog}
        >
          <DialogTrigger asChild>
            <button  className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3">
              Add Transaction
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-3xl">
                Create a Transaction
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="flex items-center">
                <label htmlFor="accountType">Account:</label>
              </div>
              <div className="flex items-center">
                <select
                  id="accountType"
                  value={accountType}
                  onChange={(event) => setAccountType(event.target.value)}
                  className="rounded mb-1"
                >
                  {accountNamesList.map((account) => (
                    <option
                      key={account.accountName}
                      value={account.accountName}
                    >
                      {account.accountName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label htmlFor="budgetAccount">Budget Account:</label>
              </div>
              <div className="flex items-center">
                <select
                  id="budgetAccount"
                  value={selectBudget}
                  onChange={(event) => setSelectBudget(event.target.value)}
                  className="rounded mb-1"
                >
                  <option value="None">None</option>
                  {budgetList.map((budget) => (
                    <option key={budget.id} value={budget.newBudget}>
                      {budget.newBudget}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label htmlFor="accountType">Transaction Name:</label>
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Transaction Name"
                  onChange={(e) => setNewTransactionName(e.target.value)}
                  className="rounded mb-1"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="accountType">Transaction Amount:</label>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="Transaction Amount"
                  onChange={(e) => setNewTransactionAmount(e.target.value)}
                  className="rounded mb-1"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="accountType">Transaction Date:</label>
              </div>
              <div className="flex items-center">
                <input
                  aria-label="Date"
                  type="date"
                  placeholder="Transaction Date"
                  onChange={(e) => setNewTransactionDate(e.target.value)}
                  className="rounded mb-1"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="transactionType">Withdraw or Deposit:</label>
              </div>
              <div className="flex items-center">
                <select
                  id="transactionType"
                  value={newTransactionType}
                  onChange={(event) =>
                    setNewTransactionType(event.target.value)
                  }
                  className="rounded mb-1"
                >
                  <option value="Withdrawal">Withdrawal</option>
                  <option value="Deposit">Deposit</option>
                </select>
              </div>
              <div className="flex items-center">
                <label htmlFor="monthlyExpense">Monthly Expense:</label>
              </div>
              <div className="flex items-center">
                <select
                  id="monthlyExpense"
                  value={monthlyExpense}
                  onChange={(event) => setMonthlyExpense(event.target.value)}
                  className="rounded mb-1"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                 className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3"
                onClick={addTransaction}
              >
                Submit Transaction
              </button> 
              </div>
            <DialogFooter >
            </DialogFooter>
          </DialogContent>
        </Dialog>{" "}
      </div>
    </>
  );
}

export default TransactionInputDialog;
