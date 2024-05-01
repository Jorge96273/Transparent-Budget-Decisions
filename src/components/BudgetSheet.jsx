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
          <button variant="outline" className="rounded-button-newuser">
            Budget Data
          </button>
        </div>
      </SheetTrigger>
      <SheetContent style={{ width: "58%" }}>
        <div className="background-color-div">
          <SheetTitle text-white rounded-md>
            <h4 className="text-white rounded-md"> Budget Data</h4>
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
