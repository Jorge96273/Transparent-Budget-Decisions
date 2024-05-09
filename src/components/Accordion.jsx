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

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"



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
                backgroundColor: "red",
                pointBorderColor: "red",
                pointBackgroundColor: "white",
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#F4A261",
                pointHoverBorderColor: "red",
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
      <div className='flex-col w-full justify-center max-w-full'>
      <Accordion
          type="multiple"
          collapsible="true"
          className="w-full"
        >
          {accountNamesList.map((accountType, index) => {
            const filteredAccounts = accountList.filter(
              (account) => account.accountType === accountType.accountName
            );

            filteredAccounts.sort((a, b) => new Date(a.newTransactionDate) - new Date(b.newTransactionDate));
            
            const balance = currentAccountBalance(accountType.accountName);

            // Calculate line chart data for the current account type
            const year = filteredAccounts.map(
              (item) => item.newTransactionDate
            );
            const amounts = filteredAccounts.map(
              (item) => item.accountBalance
            );

            return (
              <AccordionItem
                key={index} // Using index as a key, consider using a unique identifier if available
                className=" h-max w-full"
                value={`item-${index}`}
              >
                <AccordionTrigger className='rounded-xl w-3/4 flex flex-col items-center content-center justify-center pl-4 pr-4 hover:no-underline hover:bg-slate-600 bg-slate-400 shadow-md'>
                  <h4>{accountType.accountName} Account</h4>
                  <h4 className='p-2 bg-slate-500 shadow-inner rounded'>
                    {balance}
                  </h4>
                </AccordionTrigger>
                <AccordionContent>
                  <div className='bg-slate-300 rounded shadow-md'>
                    {/* Pass the calculated data to the LineChart component */}
                    <LineChart
                      category={accountType.accountName}
                      xlabels={year}
                      ydata={amounts}
                    />
                  </div>
             
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
        
        {/* <Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs> */}
      </div>

      
    </>
  );
}
