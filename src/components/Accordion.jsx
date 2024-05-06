// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import BudgetsTable from "./BudgetsTable";
// import BudgetedItemTable from "./BudgetedItemTable";
// import TransactionTable from "./TransactionTable";
// import LineChart from "@/components/LineChart";

// export function AccordionElement({
//   accountNamesList,
//   setBudgetList,
//   budgetList,
//   uid,
//   triggerFetch,
//   setTriggerFetch,
//   budgetTriggerFetch,
//   setBudgetTriggerFetch,
//   accountList,
//   setAccountList,
//   currentAccountBalance,
//   debitAccount,
//   creditAccount,
//   savingsAccount,
//   monthlyExpensesBalance,
//   monthlyExpenses,
//   lineData,
//   category,
//   amounts,
//   year,
//   debitCategory,
//   debitAmounts,
//   debitYear,
//   savingsCategory,
//   savingsAmounts,
//   savingsYear,
//   creditCategory,
//   creditAmounts,
//   creditYear,
// }) {
//   const debitList = accountList.filter(
//     (account) => account.accountType === "Debit"
//   );
//   const creditList = accountList.filter(
//     (account) => account.accountType === "Credit"
//   );
//   const savingsList = accountList.filter(
//     (account) => account.accountType === "Savings"
//   );

//   // Helper function to conditionally render All Transaction part of the accordion.
//   const hasItems = (list1, list2, list3) => {
//     const count = [list1.length > 0, list2.length > 0, list3.length > 0].filter(
//       Boolean
//     ).length;
//     return count >= 2;
//   };
//   return (
//     <>
//       <div className="flex overflow-auto justify-center">
//         <Accordion
//           type="multiple"
//           collapsible="true"
//           className="w-full flex overflow-auto"
//         >
//           {accountNamesList.map((accountType) => {
//             const filteredAccounts = accountList.filter(
//               (account) => account.accountType === accountType.accountName
//             );
//             const balance = currentAccountBalance(accountType.accountName);
//             <AccordionItem
//               key={accountType}
//               className="m-2 h-max w-full"
//               value="item-7"
//             >
//               <AccordionTrigger className="rounded w-max flex flex-col items-center content-center justify-center pl-4 pr-4 hover:no-underline hover:bg-orange-200 focus:bg-orange-200 shadow-md">
//                 <h4>{accountType}</h4>
//                 <h4 className="p-2 bg-orange-50 shadow-inner rounded">
//                   {balance}
//                 </h4>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="bg-orange-200 rounded shadow-md">
//                   {lineData ? LineChart(category, year, amounts) : "Loading"}
//                 </div>
//                 <br></br>
//                 <TransactionTable
//                   uid={uid}
//                   triggerFetch={triggerFetch}
//                   setTriggerFetch={setTriggerFetch}
//                   accountList={accountType}
//                   setAccountList={setAccountList}
//                   accountTable={accountList}
//                   budgetList={budgetList}
//                   accountNamesList={accountNamesList}
//                 />
//               </AccordionContent>
//             </AccordionItem>;
//           })}
//         </Accordion>
//       </div>
//     </>
//   );
// }
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BudgetsTable from "./BudgetsTable";
import BudgetedItemTable from "./BudgetedItemTable";
import TransactionTable from "./TransactionTable";
import LineChart from "@/components/LineChart";

export function AccordionElement({
  accountNamesList,
  setBudgetList,
  budgetList,
  uid,
  triggerFetch,
  setTriggerFetch,
  accountList,
  setAccountList,
  currentAccountBalance,
  debitAccount,
}) {
  console.log("debitAccount", debitAccount);
  return (
    <>
      <div className="flex overflow-auto justify-center">
        <Accordion
          type="multiple"
          collapsible="true"
          className="w-full flex overflow-auto"
        >
          {accountNamesList.map((accountType, index) => {
            const filteredAccounts = accountList.filter(
              (account) => account.accountType === accountType.accountName
            );
            const balance = currentAccountBalance(accountType.accountName);
            console.log("accountType", accountType);
            console.log("accountType.accountName", accountType.accountName);
            console.log(filteredAccounts);
            return (
              <AccordionItem
                key={index} // Using index as a key, consider using a unique identifier if available
                className="m-2 h-max w-full"
                value={`item-${index}`}
              >
                <AccordionTrigger className="rounded w-max flex flex-col items-center content-center justify-center pl-4 pr-4 hover:no-underline hover:bg-orange-200 focus:bg-orange-200 shadow-md">
                  <h4>{accountType.accountName}</h4>
                  <h4 className="p-2 bg-orange-50 shadow-inner rounded">
                    {balance}
                  </h4>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-orange-200 rounded shadow-md">
                    {/* Assuming LineChart is a component that accepts props */}
                    {/* <LineChart
                      category={accountType.category}
                      year={accountType.year}
                      amounts={accountType.amounts}
                    /> */}
                  </div>
                  <br />
                  <TransactionTable
                    uid={uid}
                    triggerFetch={triggerFetch}
                    setTriggerFetch={setTriggerFetch}
                    accountList={accountList}
                    setAccountList={setAccountList}
                    accountTable={filteredAccounts}
                    budgetList={budgetList}
                    accountNamesList={accountNamesList}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </>
  );
}
