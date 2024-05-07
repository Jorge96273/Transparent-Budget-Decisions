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
          <button className="rounded-full shadow-md hover:bg-slate-500 bg-slate-400 text-white py-2 px-3">
            Manage Accounts
          </button>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full">
        <div
          className="bg-slate-500"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <SheetTitle>
            <span className="text-slate-50 text-2xl rounded-2xl flex justify-center w-full p-2"> Manage Accounts</span>
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
