import { Button } from "react-bootstrap";
import { useState } from "react";
import { db } from "../config/firebase";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { doc, updateDoc } from "firebase/firestore";

export function UpdateBudgetDialog({
  budgetID,
  uid,
  setBudgetTriggerFetch,
  budgetTriggerFetch,
  budgetedName,
  budgetedAmount,
}) {
  // Use useCallback to memoize the onChange handler
  const [updatedBudgetName, setUpdatedBudgetName] = useState("");
  const [updatedBudgetAmount, setUpdatedBudgetAmount] = useState("");

  const field =
    updatedBudgetAmount && updatedBudgetName
      ? { newBudgetAmount: updatedBudgetAmount, newBudget: updatedBudgetName }
      : updatedBudgetName
      ? { newBudget: updatedBudgetName }
      : { newBudgetAmount: updatedBudgetAmount };

  const updateBudget = async (id, field) => {
    console.log(budgetID, field);
    console.log(updatedBudgetAmount, updatedBudgetName);
    const accountRef = doc(db, `budget/${uid}/newBudget`, id);
    await updateDoc(accountRef, field);
    setBudgetTriggerFetch(!budgetTriggerFetch);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3">Update Budget</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            Make changes to the budget here.
            <br></br>
            Click Update Budget when you're done.
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-center">
          <div className="grid grid-cols-2 items-center gap-4">
            <div>
              <Label htmlFor="updatedBalance" className="text-right">
                Current Budget Name: {budgetedName}
              </Label>
              <br></br>
              <br></br>
              <Input
                id="updatedName"
                placeholder="Enter New Budget Name"
                type="text"
                value={updatedBudgetName}
                onChange={(e) => setUpdatedBudgetName(e.target.value)}
                className="col-span-3"
              />
              <br></br>
            </div>
            <br></br>
            <div>
              <br></br>
              <Label htmlFor="updatedBalance" className="text-right">
                Current Budget Amount: ${budgetedAmount}
              </Label>
              <br></br>
              {/* Use Input component and add id attribute */}
              <br></br>
              <Input
                id="updatedAmount"
                placeholder="Enter New Budget Amount"
                type="number"
                value={updatedBudgetAmount}
                onChange={(e) => setUpdatedBudgetAmount(Number(e.target.value))}
                className="col-span-3"
              />
              <br></br>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3"
          onClick={() => updateBudget(budgetID, field)}
        >
          Update Budget
        </button>
      </DialogContent>
    </Dialog>
  );
}
