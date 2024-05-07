import { useEffect, useState, useRef } from "react";
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
import AccountsTable from "./AccountsTable";

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
  setAccountTriggerFetch,
  accountTriggerFetch,
}) {
  const currentAccountNames = accountNamesList
    ? accountNamesList.map((account) => account.accountName)
    : null;
  const [newAccountName, setNewAccountName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dialogKey = useRef(0);

  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogKey.current += 1;
  };

  const accountCollectionRef = collection(db, `account/${uid}/newAccount`);

  const handleCreateAccount = async () => {
    if (!uid) {
      console.error("UID is required to create an account.");
      return;
    }

    if (currentAccountNames.includes(newAccountName)) {
      setAlertMessage("Account Already Exists");
      setShowAlert(true);
    } else {
      try {
        await addDoc(accountCollectionRef, {
          accountName: newAccountName,
        });
        console.log("NewAccount", newAccountName);
        setAccountTriggerFetch(!accountTriggerFetch);
        closeDialog();
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
            <button className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3">
              Add Account
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <h3 className="flex justify-center">Add an Account </h3>
            <picture>
              <source media="(min-width: )" srcSet="" />
              <img src="" alt="" />
            </picture>
            <div>
              <DialogHeader>
                <DialogTitle>
                  {showAlert && (
                    <div className="color-red alert">
                      <p className="text-red-500">{alertMessage}</p>
                      <button
                        className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3"
                        onClick={closeAlert}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
              <input
                type="text"
                placeholder="Account Name"
                onChange={(e) => setNewAccountName(e.target.value)}
                className="rounded mb-1"
              />
              </div>
            </div>
              <div className="flex justify-center">
              <button
               className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3"
                onClick={handleCreateAccount}
              >
                Create Account
              </button> 
              </div>
            <DialogFooter>
              {/* <button
                className="rounded-button-newuser hover:bg-slate-100"
                onClick={handleCreateAccount}
              >
                Create Account
              </button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default CreateAccountDialog;
