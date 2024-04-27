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

export function TransAmtDialog({
  transactionID,
  uid,
  setTriggerFetch,
  triggerFetch,
}) {
  // Use useCallback to memoize the onChange handler
  const [updatedTransactionAmount, setUpdatedTransactionAmount] = useState("");

  const updateTransaction = async (id) => {
    const accountRef = doc(db, `${uid}`, id);
    await updateDoc(accountRef, {
      newTransactionAmount: updatedTransactionAmount,
    });

    setTriggerFetch(!triggerFetch);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn btn-secondary btn-sm">Update Amount</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Amount</DialogTitle>
          <DialogTitle>
            Make changes to the amount here.
            <br></br>
            Click Update Transaction when you're done.
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="updatedBalance" className="text-right">
              Amount
            </Label>
            {/* Use Input component and add id attribute */}
            <Input
              id="updatedBalance"
              placeholder="Updated Balance"
              type="number"
              value={updatedTransactionAmount}
              onChange={(e) =>
                setUpdatedTransactionAmount(Number(e.target.value))
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => updateTransaction(transactionID)}
          >
            Update Transaction
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
