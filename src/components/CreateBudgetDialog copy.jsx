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

function CreateBudgetDialog({
  uid,
  triggerFetch,
  setTriggerFetch,
  accountList,
  setAccountList,
  budgetAccount,
  setBudgetAccount,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(true); //?variable to manage dialog box visibility
  const dialogKey = useRef(0);

  const closeDialog = () => {
    setIsDialogOpen(false);
    dialogKey.current += 1;
  };

  const budgetCollectionRef = collection(db, `budget/${uid}/newBudget`);

  const createBudget = async () => {
    const docRef = await addDoc(budgetCollectionRef, {
      newBudget,
      newBudgetAmount,
    });
    setTriggerFetch(!triggerFetch);
    closeDialog();
    setNewBudget(""), setNewBudgetAmount(0);
  };
  // const handleCreateBudget = async() => {
  //   await createBudget()
  // }
  const getBudgetList = async () => {
    try {
      const data = await getDocs(collection(db, `budget/${uid}/newBudget`));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBudgetAccount(filteredData);
    } catch (error) {
      console.log(error);
    }
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
  return (
    <>
      <div className="App">
        <Dialog
          key={dialogKey.current}
          isOpen={isDialogOpen}
          onClose={closeDialog}
        >
          <DialogTrigger asChild>
            <Button className="btn btn-secondary" variant="outline">
              Click Here to Create a Budget Category and Limit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            {" "}
            <h3>Create a Budget</h3>
            <div>
              <DialogHeader>
                <DialogTitle>
                  Add a Budget Category and Monthly Limit
                </DialogTitle>
              </DialogHeader>

              <input
                type="text"
                placeholder="Budget Name"
                onChange={(e) => setNewBudget(e.target.value)}
              />

              <input
                type="number"
                placeholder="Budget Amount"
                onChange={(e) => setNewBudgetAmount(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button className="btn btn-secondary" onClick={createBudget}>
                Create Budget
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>{" "}
      </div>
    </>
  );
}

export default CreateBudgetDialog;
