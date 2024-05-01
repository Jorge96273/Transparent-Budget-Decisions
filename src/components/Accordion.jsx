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
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center", // Center items horizontally
        alignItems: "center", // Center items vertically
      }}
    >
      <Accordion type="multiple" collapsible="true" className="w-75">
        <AccordionItem value="item-1">
          <AccordionTrigger className="background-color-div">
            <h4>Click to View Budget Categories And Amounts</h4>
          </AccordionTrigger>
          <AccordionContent>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center", // Center items horizontally
              }}
            >
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
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="item-2">
          <AccordionTrigger className="background-color-div">
            <h4>Click to View Current Budget Amounts</h4>
          </AccordionTrigger>
          <AccordionContent>
            <BudgetedItemTable
              accountList={accountList}
              budgetList={budgetList}
              uid={uid}
              triggerFetch={triggerFetch}
              setTriggerFetch={setTriggerFetch}
              budgetTriggerFetch={budgetTriggerFetch}
              setBudgetTriggerFetch={setBudgetTriggerFetch}
            />
          </AccordionContent>
        </AccordionItem> */}
        <AccordionItem value="item-3">
          <AccordionTrigger className="background-color-div">
            {" "}
            <h4>
              Click to View Debit Account Transaction History&emsp;&emsp;Current
              Balance: {currentAccountBalance("Debit")}
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
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="background-color-div">
            {" "}
            <h4>
              Click to View Savings Account Transaction
              History&emsp;&emsp;Current Balance:{" "}
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
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="background-color-div">
            {" "}
            <h4>
              Click to View Credit Card Transaction History&emsp;&emsp;Current
              Balance: {currentAccountBalance("Credit")}
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
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger className="background-color-div">
            {" "}
            <h4>
              Click to View Monthly Expenses &emsp;&emsp; Current Monthly
              Expense: {monthlyExpensesBalance()}
            </h4>
          </AccordionTrigger>
          <AccordionContent>
            <TransactionTable
              uid={uid}
              triggerFetch={triggerFetch}
              setTriggerFetch={setTriggerFetch}
              accountList={accountList}
              setAccountList={setAccountList}
              accountTable={monthlyExpenses}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger className="background-color-div">
            <h4>
              Click to View All Transactions &emsp;&emsp; Current Transactions:{" "}
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
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
