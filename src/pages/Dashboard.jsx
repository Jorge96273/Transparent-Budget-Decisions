import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { db, auth } from "../config/firebase";

import TransactionTable from "@/components/TransactionTable";
import { useOutletContext } from "react-router-dom";
import { addDoc, getDocs, collection } from "firebase/firestore";
import TransactionInputDialog from "@/components/TransactionInputDialog";
import CreateBudgetDialog from "@/components/CreateBudgetDialog";
import BudgetsTable from "@/components/BudgetsTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BudgetedItemTable from "@/components/BudgetedItemTable";
import { AccordionElement } from "@/components/Accordion";
import LineChart from "@/components/LineChart";
import BudgetItem from "@/components/BudgetItem";
import CalendarChart from "@/components/CalendarChart";
import { BudgetSheet } from "@/components/BudgetSheet";
import { MonthlyExpensesSheet } from "@/components/MonthlyExpenseSheet";
import AccountBalances from "@/components/AccountBalances";
import CreateAccountDialog from "@/components/CreateAccountDialog";
import { AccountSheet } from "@/components/AccountSheet";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  // const [lineData, setLineData] = useState([{ dates: "", balances: 0 }]);
  const [lineData, setLineData] = useState([]);
  const [debitLine, setDebitLine] = useState([]);
  const [creditLine, setCreditLine] = useState([]);
  const [savingsLine, setSavingsLine] = useState([]);
  const [monthlyCalendar, setMonthlyCalendar] = useState([]);
  const [newAccountName, setNewAccountName] = useState("");
  // const [date, setDate] = useState([])
  // const [balance, setBalance] = useState([])
  const uid = user?.uid;
  const accountCollectionRef = collection(db, `account/${uid}/newAccount`);
  const {
    triggerFetch,
    setTriggerFetch,
    accountList,
    setAccountList,
    budgetList,
    setBudgetList,
    budgetTriggerFetch,
    setBudgetTriggerFetch,
    accountNamesList,
    setAccountNamesList,
    accountTriggerFetch,
    setAccountTriggerFetch,
  } = useOutletContext();

  const firstRenderRef = useRef(true);

  const getAccountList = async () => {
    try {
      const data = await getDocs(collection(db, `${uid}`));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAccountList(filteredData);
      console.log("DASHBOARD GETACCOUNTLIST");
    } catch (err) {
      console.log(err);
    }
  };

  const getBudgetList = async () => {
    try {
      const data = await getDocs(collection(db, `budget/${uid}/newBudget`));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("DASHBOARD GETBUDGETLIST");
      setBudgetList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBudgetList();
  }, [budgetTriggerFetch, user]);

  const monthlyExpenses = accountList.filter(
    (account) => account.monthlyExpense === "Yes"
  );

  const currentAccountBalance = (accountType) => {
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    if (accountList) {
      accountList.forEach((transaction) => {
        if (transaction.accountType === accountType) {
          if (transaction.newTransactionType === "Withdrawal") {
            totalWithdrawals += Number(transaction.newTransactionAmount);
          } else if (transaction.newTransactionType === "Deposit") {
            totalDeposits += Number(transaction.newTransactionAmount);
          }
        } else if (!accountType) {
          if (transaction.newTransactionType === "Withdrawal") {
            totalWithdrawals += Number(transaction.newTransactionAmount);
          } else if (transaction.newTransactionType === "Deposit") {
            totalDeposits += Number(transaction.newTransactionAmount);
          }
        }
      });
    }
    let recordedBalance = totalDeposits - totalWithdrawals;
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(recordedBalance);
    return formatted;
  };

  const getAccountNames = async () => {
    try {
      const data = await getDocs(collection(db, `account/${uid}/newAccount`));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAccountNamesList(filteredData);
      console.log("DASHBOARD GETACCOUNTNAMES");
      console.log("Get Account Names FILTERED DATA", filteredData);
      const accountNames = filteredData.map((account) => account.accountName);
      const accountNamesToCheck = ["Savings", "Credit", "Debit"];
      const allAccountsPresent = accountNamesToCheck.every((name) =>
        accountNames.includes(name)
      );
      if (!allAccountsPresent) {
        // Create a promise for each missing account name
        const promises = accountNamesToCheck.map(async (name) => {
          if (!accountNames.includes(name)) {
            const docRef = await addDoc(accountCollectionRef, {
              accountName: name,
            });
            console.log(`New document added for ${name}:`, docRef.id);
          }
        });
        // Wait for all promises to resolve
        await Promise.all(promises);
      }
      console.log("SetAccountName", filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const monthlyExpensesBalance = () => {
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    if (accountList) {
      let filterred = accountList.filter(
        (account) => account.monthlyExpense === "Yes"
      );
      filterred.forEach((transaction) => {
        if (transaction.newTransactionType === "Withdrawal") {
          totalWithdrawals += Number(transaction.newTransactionAmount);
        } else if (transaction.newTransactionType === "Deposit") {
          totalDeposits += Number(transaction.newTransactionAmount);
        }
      });
    }
    let recordedBalance = totalDeposits - totalWithdrawals;
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(recordedBalance);
    return formatted;
  };

  useEffect(() => {
    if (!firstRenderRef.current) {
      getAccountList(); // Call getAccountList on subsequent renders
    }
    firstRenderRef.current = false; // Ensure this runs only once after the first render
  }, [triggerFetch, user]);

  useEffect(() => {
    getAccountNames(); // Call getAccountNames on every render after the initial one
  }, [accountTriggerFetch, user]);

  // useEffect(() => {
  //   getTotalBalance(),
  //     lineGraphAccount("Debit"),
  //     lineGraphAccount("Credit"),
  //     lineGraphAccount("Savings");
  // }, [accountList, budgetTriggerFetch]);

  return (
    <>
      <div className="animate-in slide-in-from-bottom duration-1000  w-full">
        <div>
          <div className="flex w-full justify-center h-max p-2">
            <div className="flex items-center justify-center h-max rounded ">
              <BudgetItem budgetList={budgetList} accountList={accountList} />
            </div>
          </div>
          <div className="p-8">
            <div className="flex w-full items-center justify-center">
              <div className="mr-2 ml-2">
                <CreateAccountDialog
                  accountNamesList={accountNamesList}
                  setAccountNamesList={setAccountNamesList}
                  newAccountName={newAccountName}
                  setNewAccountName={setNewAccountName}
                  getAccountNames={getAccountNames}
                  uid={uid}
                  accountTriggerFetch={accountTriggerFetch}
                  setAccountTriggerFetch={setAccountTriggerFetch}
                />
              </div>
              <div className="mr-2 ml-2">
                <AccountSheet
                  accountNamesList={accountNamesList}
                  setAccountNamesList={setAccountNamesList}
                  newAccountName={newAccountName}
                  setNewAccountName={setNewAccountName}
                  getAccountNames={getAccountNames}
                  uid={uid}
                  accountTriggerFetch={accountTriggerFetch}
                  setAccountTriggerFetch={setAccountTriggerFetch}
                />
              </div>
              <div className="mr-2 ml-2">
                <TransactionInputDialog
                  uid={uid}
                  triggerFetch={triggerFetch}
                  setTriggerFetch={setTriggerFetch}
                  accountList={accountList}
                  setAccountList={setAccountList}
                  setBudgetList={setBudgetList}
                  budgetList={budgetList}
                  accountNamesList={accountNamesList}
                  getAccountNames={getAccountNames}
                />
              </div>
              <div className="mr-2 ml-2">
                <CreateBudgetDialog
                  uid={uid}
                  triggerFetch={triggerFetch}
                  setTriggerFetch={setTriggerFetch}
                  accountList={accountList}
                  setAccountList={setAccountList}
                  setBudgetList={setBudgetList}
                  budgetList={budgetList}
                />
              </div>
              {budgetList.length > 0 ? (
                <div className="mr-2 ml-2">
                  <BudgetSheet
                    accountList={accountList}
                    budgetList={budgetList}
                    uid={uid}
                    triggerFetch={triggerFetch}
                    setTriggerFetch={setTriggerFetch}
                    budgetTriggerFetch={budgetTriggerFetch}
                    setBudgetTriggerFetch={setBudgetTriggerFetch}
                  />{" "}
                </div>
              ) : null}
              {monthlyExpenses.length > 0 ? (
                <div className="mr-2 ml-2">
                  <MonthlyExpensesSheet
                    uid={uid}
                    triggerFetch={triggerFetch}
                    setTriggerFetch={setTriggerFetch}
                    accountList={accountList}
                    setAccountList={setAccountList}
                    monthlyExpenses={monthlyExpenses}
                    budgetList={budgetList}
                    accountNamesList={accountNamesList}
                  />
                </div>
              ) : null}
            </div>
            <div className="flex w-full justify-center h-max">
              <div className="flex items-center justify-center p-1 h-max rounded ">
                <AccountBalances
                  currentAccountBalance={currentAccountBalance}
                  accountList={accountList}
                  accountNamesList={accountNamesList}
                />
              </div>
            </div>
            <div className="w-full flex justify-center ">
              <div className="flex w-max justify-center h-max p-4 mb-2 rounded ">
                <CalendarChart objData={accountList} />
              </div>
            </div>
            <div className="flex w-full justify-center content-center items-center">
              <div className=" w-full">
                <AccordionElement
                  setBudgetList={setBudgetList}
                  budgetList={budgetList}
                  uid={uid}
                  accountList={accountList}
                  setAccountList={setAccountList}
                  triggerFetch={triggerFetch}
                  setTriggerFetch={setTriggerFetch}
                  budgetTriggerFetch={budgetTriggerFetch}
                  setBudgetTriggerFetch={setBudgetTriggerFetch}
                  currentAccountBalance={currentAccountBalance}
                  // debitAccount={debitAccount}
                  // savingsAccount={savingsAccount}
                  // creditAccount={creditAccount}
                  monthlyExpensesBalance={monthlyExpensesBalance}
                  monthlyExpenses={monthlyExpenses}
                  lineData={lineData}
                  // category={category}
                  // amounts={amounts}
                  // year={year}
                  // debitCategory={debitCategory}
                  // debitAmounts={debitAmounts}
                  // debitYear={debitYear}
                  // savingsCategory={savingsCategory}
                  // savingsAmounts={savingsAmounts}
                  // savingsYear={savingsYear}
                  // creditCategory={creditCategory}
                  // creditAmounts={creditAmounts}
                  // creditYear={creditYear}
                  accountNamesList={accountNamesList}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
