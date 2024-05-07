import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BudgetsTable from "./BudgetsTable";
import BudgetedItemTable from "./BudgetedItemTable";
import TransactionTable from "./TransactionTable";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

// LineChart Component
const LineChart = ({ category, xlabels, ydata }) => {
  return (
    <div>
      <div>
        <Line
          data={{
            labels: xlabels,
            datasets: [
              {
                label: category,
                data: ydata,
                fill: false,
                borderColor: "#6A8D92",
                backgroundColor: "#6F1D1B",
                pointBorderColor: "#6F1D1B",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#F4A261",
                pointHoverBorderColor: "#6F1D1B",
                pointHoverBorderWidth: 20,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "#000",
                  font: {
                    size: 12,
                  },
                },
                position: "top",
              },
            },
            animation: {
              tension: {
                duration: 2500,
                easing: "linear",
                from: 1,
                to: 0,
                loop: false,
              },
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

// AccordionElement Component
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
}) {
  return (
    <>
      <div className='flex w-full justify-center max-w-full'>
        <Accordion
          type='multiple'
          collapsible='true'
          className='w-full flex-col flex overflow-x-scroll'
        >
          {debitList.length > 0 ? (
            <AccordionItem className='p-2 h-full flex flex-col w-full' value='item-3'>
              <AccordionTrigger className='rounded w-3/4 flex flex-col items-center content-center justify-center pl-4 pr-4 hover:no-underline hover:bg-slate-300  shadow-md'>
                <h4>Debit Account</h4>
                <h3 className='p-2 bg-slate-50 shadow-inner rounded'>
                  {" "}
                  {currentAccountBalance("Debit")}
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className='bg-slate-300 rounded shadow-md'>
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
            <AccordionItem className='p-2 h-full w-full' value='item-4'>
              <AccordionTrigger className='rounded w-max flex flex-col items-center content-center justify-center pl-4 pr-4 hover:no-underline hover:bg-slate-300  shadow-md'>
                <h4>Savings Account</h4>
                <h3 className='p-2 bg-slate-50 shadow-inner rounded'>
                  {currentAccountBalance("Savings")}
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className='bg-slate-300 rounded shadow-md'>
                  {" "}
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
            <AccordionItem className='p-2 h-max w-full' value='item-5'>
              <AccordionTrigger className='rounded w-max flex flex-col items-center content-center justify-center pl-4 pr-4 hover:no-underline hover:bg-slate-300  shadow-md'>
                <h4>
                  Credit Card
                </h4>
                  <h3 className='p-2 bg-slate-50 shadow-inner rounded'>
                    {currentAccountBalance("Credit")}
                  </h3>
              </AccordionTrigger>
              <AccordionContent>
                <div className='bg-slate-300 rounded shadow-md'>
                  {" "}
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
            <AccordionItem className='p-2 h-max w-full' value='item-7'>
              <AccordionTrigger className='rounded w-max flex flex-col items-center content-center justify-center pl-4 pr-4 hover:no-underline hover:bg-slate-300  shadow-md'>
                <h4>All Transactions</h4>
                <h4 className='p-2 bg-slate-50 shadow-inner rounded'>
                  {currentAccountBalance("")}
                </h4>
              </AccordionTrigger>
              <AccordionContent>
                <div className='bg-slate-300 rounded shadow-md'>
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
    </>
  );
}
