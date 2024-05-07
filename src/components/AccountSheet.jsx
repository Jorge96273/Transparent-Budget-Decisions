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
import AccountsTable from "./AccountsTable";

export function AccountSheet({
  accountList,
  setAccountList,
  uid,
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
      <SheetContent style={{ width: "50%" }}>
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
