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

            // Calculate line chart data for the current account type
            const year = filteredAccounts.map(
              (item) => item.newTransactionDate
            );
            const amounts = filteredAccounts.map(
              (item) => item.newTransactionAmount
            );

            return (
              <AccordionItem
                key={index} // Using index as a key, consider using a unique identifier if available
                className="m-2 h-max w-full"
                value={`item-${index}`}
              >
                <AccordionTrigger className="rounded w-max flex flex-col items-center content-center justify-center pl-4 pr-4 hover:no-underline hover:bg-orange-200 focus:bg-orange-200 shadow-md">
                  <h4>{accountType.accountName} Account</h4>
                  <h4 className="p-2 bg-orange-50 shadow-inner rounded">
                    {balance}
                  </h4>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-orange-200 rounded shadow-md">
                    {/* Pass the calculated data to the LineChart component */}
                    <LineChart
                      category={accountType.accountName}
                      xlabels={year}
                      ydata={amounts}
                    />
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
