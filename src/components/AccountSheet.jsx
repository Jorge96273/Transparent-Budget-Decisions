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
import AccountsTable from "./AccountsTable";

export function AccountSheet({
  accountList,

  setAccountList,
  uid,
  triggerFetch,
  setTriggerFetch,
  accountTriggerFetch,
  setAccountTriggerFetch,

  accountNamesList,
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>
          <button className="rounded-button-newuser hover:bg-orange-100">
            Account Data
          </button>
        </div>
      </SheetTrigger>
      <SheetContent style={{ width: "100%" }}>
        <div
          className="background-color-div"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <SheetTitle text-white rounded-md>
            <h4 className="text-white rounded-md"> Account Data</h4>
          </SheetTitle>
          <AccountsTable
            accountNamesList={accountNamesList}
            uid={uid}
            accountTriggerFetch={accountTriggerFetch}
            setAccountTriggerFetch={setAccountTriggerFetch}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
