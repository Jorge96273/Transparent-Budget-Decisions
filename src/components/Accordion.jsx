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
  setBudgetList,
  budgetList,
  uid,
  triggerFetch,
  setTriggerFetch,
  budgetTriggerFetch,
  setBudgetTriggerFetch,
  accountList,
  setAccountList,
  currentAccountBalance,
  debitAccount,
  creditAccount,
  savingsAccount,
  monthlyExpensesBalance,
  monthlyExpenses,
  lineData,
  category,
  amounts,
  year,
  debitCategory,
  debitAmounts,
  debitYear,
  savingsCategory,
  savingsAmounts,
  savingsYear,
  creditCategory,
  creditAmounts,
  creditYear,
}) {
  const debitList = accountList.filter(
    (account) => account.accountType === "Debit"
  );
  const creditList = accountList.filter(
    (account) => account.accountType === "Credit"
  );
  const savingsList = accountList.filter(
    (account) => account.accountType === "Savings"
  );

  // Helper function to conditionally render All Transaction part of the accordion.
  const hasItems = (list1, list2, list3) => {
    const count = [list1.length > 0, list2.length > 0, list3.length > 0].filter(
      Boolean
    ).length;
    return count >= 2;
  };
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center", // Center items horizontally
        alignItems: "center", // Center items vertically
      }}
    >
      <Accordion
        type="multiple"
        collapsible="true"
        className="w-75"
        style={{ borderRadius: "10px" }}
      >
        {debitList.length > 0 ? (
          <AccordionItem value="item-3">
            <AccordionTrigger
              className="background-color-div"
              style={{ borderRadius: "10px" }}
            >
              {" "}
              <h4>
                Debit Account &emsp;&emsp;Current Balance:{" "}
                {currentAccountBalance("Debit")}
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                {lineData
                  ? LineChart(debitCategory, debitYear, debitAmounts)
                  : "Loading"}
              </div>
              <br></br>
              <TransactionTable
                uid={uid}
                triggerFetch={triggerFetch}
                setTriggerFetch={setTriggerFetch}
                accountList={accountList}
                setAccountList={setAccountList}
                accountTable={debitAccount}
                budgetList={budgetList}
              />
            </AccordionContent>
          </AccordionItem>
        ) : null}
        {savingsList.length > 0 ? (
          <AccordionItem value="item-4">
            <AccordionTrigger
              className="background-color-div"
              style={{ borderRadius: "10px" }}
            >
              {" "}
              <h4>
                Savings Account &emsp;&emsp;Current Balance:{" "}
                {currentAccountBalance("Savings")}
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                {lineData
                  ? LineChart(savingsCategory, savingsYear, savingsAmounts)
                  : "Loading"}
              </div>
              <br></br>
              <TransactionTable
                uid={uid}
                triggerFetch={triggerFetch}
                setTriggerFetch={setTriggerFetch}
                accountList={accountList}
                setAccountList={setAccountList}
                accountTable={savingsAccount}
                budgetList={budgetList}
              />
            </AccordionContent>
          </AccordionItem>
        ) : null}
        {creditList.length > 0 ? (
          <AccordionItem value="item-5">
            <AccordionTrigger
              className="background-color-div"
              style={{ borderRadius: "10px" }}
            >
              {" "}
              <h4>
                Credit Card &emsp;&emsp;Current Balance:{" "}
                {currentAccountBalance("Credit")}
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                {lineData
                  ? LineChart(creditCategory, creditYear, creditAmounts)
                  : "Loading"}
              </div>
              <br></br>
              <TransactionTable
                uid={uid}
                triggerFetch={triggerFetch}
                setTriggerFetch={setTriggerFetch}
                accountList={accountList}
                setAccountList={setAccountList}
                accountTable={creditAccount}
                budgetList={budgetList}
              />
            </AccordionContent>
          </AccordionItem>
        ) : null}
        {hasItems(savingsList, creditList, debitList) ? (
          <AccordionItem value="item-7">
            <AccordionTrigger
              className="background-color-div"
              style={{ borderRadius: "10px" }}
            >
              <h4>
                All Transactions &emsp;&emsp; Current Transactions:{" "}
                {currentAccountBalance("")}
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                {lineData ? LineChart(category, year, amounts) : "Loading"}
              </div>
              <br></br>
              <TransactionTable
                uid={uid}
                triggerFetch={triggerFetch}
                setTriggerFetch={setTriggerFetch}
                accountList={accountList}
                setAccountList={setAccountList}
                accountTable={accountList}
                budgetList={budgetList}
              />
            </AccordionContent>
          </AccordionItem>
        ) : null}
      </Accordion>
    </div>
  );
}
