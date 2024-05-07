import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import BudgetedItemTable from "./BudgetedItemTable";
import { PinLeftIcon } from "@radix-ui/react-icons";

export function BudgetSheet({
  accountList,

  setAccountList,
  uid,
  triggerFetch,
  setTriggerFetch,
  budgetTriggerFetch,
  setBudgetTriggerFetch,
  monthlyExpenses,
  budgetList,
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <button   className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3">
            Manage Budgets
          </button>
        </div>
      </SheetTrigger>
      <SheetContent style={{ width: "100%" }}>
        <div
          className="bg-slate-500"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <SheetTitle >
            <span className="text-slate-50 text-2xl rounded-2xl flex justify-center w-full p-2"> Manage Budgets</span>
          </SheetTitle>
          <BudgetedItemTable
            accountList={accountList}
            budgetList={budgetList}
            uid={uid}
            triggerFetch={triggerFetch}
            setTriggerFetch={setTriggerFetch}
            budgetTriggerFetch={budgetTriggerFetch}
            setBudgetTriggerFetch={setBudgetTriggerFetch}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
