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
import TransactionTable from "./TransactionTable";

export function MonthlyExpensesSheet({
  accountList,
  uid,
  budgetList,
  setAccountList,
  budgetTriggerFetch,
  triggerFetch,
  setTriggerFetch,
  setBudgetTriggerFetch,
  monthlyExpenses,
  accountNamesList,
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="text-white">
          {/* Assuming Button component accepts variant and className props */}
          <button className="rounded-button-newuser hover:bg-orange-100">
            Monthly Transaction
          </button>
        </div>
      </SheetTrigger>
      <SheetContent className="flex justify-center w-full">
        <div
          className="background-color-div rounded text-black"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <SheetTitle>
            <h4 className="rounded-md text-white">Monthly Transactions</h4>
          </SheetTitle>

          {monthlyExpenses && (
            <TransactionTable
              uid={uid}
              triggerFetch={triggerFetch}
              setTriggerFetch={setTriggerFetch}
              accountList={accountList}
              setAccountList={setAccountList}
              accountTable={monthlyExpenses}
              budgetList={budgetList}
              accountNamesList={accountNamesList}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
