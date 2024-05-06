import { useEffect, useState, useRef } from "react";

import "../App.css";
import { Auth } from "./auth";
import { db, auth } from "../config/firebase";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CreateAccountDialog({
  uid,
  triggerFetch,
  setTriggerFetch,
  accountList,
  setAccountList,
  budgetAccount,
  setBudgetAccount,
  accountNamesList,
  setAccountNamesList,
  getAccountNames,
}) {
  const currentAccountNames = accountNamesList
    ? accountNamesList.map((account) => account.accountName)
    : null;
  const [newAccountName, setNewAccountName] = useState("");
  // This code is to close the dialog box, the closeDialog method will be added to the createBudget method to close the dialog box when clicking create budget.
  const [isDialogOpen, setIsDialogOpen] = useState(true); //?variable to manage dialog box visibility
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State to hold alert message
  const dialogKey = useRef(0);
  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogKey.current += 1;
  };
  // this set the database path for Firebase
  const accountCollectionRef = collection(db, `account/${uid}/newAccount`);

  const createAccount = async () => {
    // Check if uid is truthy
    if (!uid) {
      console.error("UID is required to create an account.");
      return; // Exit the function early if uid is falsy
    }

    if (currentAccountNames.includes(newAccountName)) {
      setAlertMessage("Account Already Exists"); // Set the alert message
      setShowAlert(true); // Show the alert
    } else {
      try {
        const docRef = await addDoc(accountCollectionRef, {
          accountName: newAccountName,
        });
        console.log("NewAccount", newAccountName);
        // Optionally, update accountNamesList here...
        closeDialog();
        getAccountNames(); // Refresh the account names list
      } catch (error) {
        console.error("Error creating account:", error);
        // Optionally, handle error...
      }
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="App">
        {showAlert && (
          <div className="alert">
            <p>{alertMessage}</p>
            <button onClick={closeAlert}>Close</button>
          </div>
        )}
        <Dialog
          key={dialogKey.current}
          isOpen={isDialogOpen}
          onClose={closeDialog}
        >
          <DialogTrigger asChild>
            <button className="rounded-button-newuser hover:bg-orange-100">
              Create an Account
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            {" "}
            <h3>Create a Create </h3>
            <div>
              <DialogHeader>
                <DialogTitle>
                  {" "}
                  {showAlert && (
                    <div className="color-red alert">
                      <p className="text-red-500">{alertMessage}</p>
                      <button
                        className="rounded-button-newuser hover:bg-orange-100 text-red-500"
                        onClick={closeAlert}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </DialogTitle>
              </DialogHeader>

              <input
                type="text"
                placeholder="Account Name"
                onChange={(e) => setNewAccountName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <button
                className="rounded-button-newuser hover:bg-orange-100"
                onClick={createAccount}
              >
                Create Account
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>{" "}
      </div>
    </>
  );
}

export default CreateAccountDialog;
