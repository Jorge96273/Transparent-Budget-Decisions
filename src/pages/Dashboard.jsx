import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { db, auth } from "../config/firebase";
import TransactionTable from "@/components/TransactionTable";
import { useOutletContext } from "react-router-dom";
import { addDoc, getDocs, collection, doc, getDoc } from "firebase/firestore";
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
  const [isLoading, setIsLoading] = useState(false);
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

  const getAccountNames = async (user) => {
    if (!user) {
      return; // Exit the function if user is not true
    }

    try {
      const data = await getDocs(collection(db, `account/${uid}/newAccount`));
      let filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAccountNamesList(filteredData);
      console.log("DASHBOARD GETACCOUNTNAMES");
      console.log("Get Account Names FILTERED DATA", filteredData);
      const accountNames = filteredData.map((account) => account.accountName);
      const accountNamesToCheck = ["Savings", "Credit", "Debit"];

      // Check if each account name exists before adding
      const promises = accountNamesToCheck.map(async (name) => {
        if (!accountNames.includes(name)) {
          // Check if the document already exists
          const docRef = doc(db, `account/${uid}/newAccount`, name);
          const docSnap = await getDoc(docRef);

          if (!docSnap.exists()) {
            // If the document does not exist, add it
            await addDoc(collection(db, `account/${uid}/newAccount`), {
              accountName: name,
            });
            console.log(`New document added for ${name}`);
          }
        }
      });

      // Wait for all promises to resolve
      await Promise.all(promises);

      // Fetch the updated list of accounts after adding new documents
      const updatedData = await getDocs(
        collection(db, `account/${uid}/newAccount`)
      );
      filteredData = updatedData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAccountNamesList(filteredData); // Update the state with the new list
      console.log("Updated Account Names List", filteredData);
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

  const isLoadingRef = useRef(false);

  // useEffect(() => {
  //   // Check if it's the first render or if the user has changed
  //   if (firstRenderRef.current || user) {
  //     firstRenderRef.current = false; // Set to false after the first render
  //     getAccountNames(user); // Call getAccountNames only once after the first render or when the user changes
  //   }
  // }, [user]);

  useEffect(() => {
    getAccountNames(user); // Call getAccountNames on every render after the initial one
  }, [accountTriggerFetch]);

  useEffect(() => {
    getAccountList();
    getBudgetList(); // Call getAccountNames on every render after the initial one
  }, []);

  return (
    <>
      <div className="flex flex-col w-100 p-2 overflow-hidden animate-in slide-in-from-bottom duration-1000 ">
        <div className="bg-slate-600  m-4 rounded-3xl">
          <div className="w-full flex flex-col items-center justify-center ">
            <h1 className="bg-slate-800 text-slate-50 w-full py-2 font-thin text-3xl rounded-tl-2xl rounded-tr-2xl flex items-center justify-center">
              Dashboard
            </h1>
            <h1 className="text-slate-50 flex justify-center w-full rounded-tl-xl rounded-tr-xl p-2 text-xl">
              Welcome Back, {user?.displayName ? user.displayName : "User"}!
            </h1>
            <div className="flex items-center flex-col justify-center p-1 mb-4 h-max rounded ">
              <div className="bg-slate-400 shadow-xl shadow-slate-400/50 rounded-tl-2xl rounded-xl pb-1">
                <h3 className="rounded-tl-xl font-light text-2xl rounded-tr-xl bg-slate-700 text-slate-50 justify-center flex w-full p-2">
                  Account Balances
                </h3>
                {accountNamesList.length > 0 ? (
                  <div className="">
                    <AccountBalances
                      currentAccountBalance={currentAccountBalance}
                      accountList={accountList}
                      accountNamesList={accountNamesList}
                    />
                  </div>
                ) : (
                  // Render a loading indicator or message when accountNamesList is empty
                  <div>Loading account names...</div>
                )}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap justify-center py-3">
                {accountNamesList.length > 0 ? (
                  <div className="mx-2 mb-2 sm:mb-0">
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
                ) : (
                  // Render a loading indicator or message when accountNamesList is empty
                  <div>Loading account names...</div>
                )}
                {accountNamesList.length > 0 ? (
                  <div className="mx-2 mb-2 sm:mb-0">
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
                ) : (
                  // Render a loading indicator or message when accountNamesList is empty
                  <div>Loading account names...</div>
                )}
                {accountNamesList.length > 0 ? (
                  <div className="mx-2 mb-2 sm:mb-0">
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
                ) : (
                  // Render a loading indicator or message when accountNamesList is empty
                  <div>Loading account names...</div>
                )}

                {accountNamesList.length > 0 ? (
                  <div className="mx-2 mb-2 sm:mb-0">
                    <CreateBudgetDialog
                      uid={uid}
                      triggerFetch={triggerFetch}
                      setTriggerFetch={setTriggerFetch}
                      accountList={accountList}
                      setAccountList={setAccountList}
                      setBudgetList={setBudgetList}
                      budgetList={budgetList}
                      setBudgetTriggerFetch={setBudgetTriggerFetch}
                      budgetTriggerFetch={budgetTriggerFetch}
                    />
                  </div>
                ) : (
                  // Render a loading indicator or message when accountNamesList is empty
                  <div>Loading account names...</div>
                )}
                {budgetList.length > 0 ? (
                  <div className="mx-2 mb-2 sm:mb-0">
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
                  <div className="mx-2 mb-2 sm:mb-0">
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
            </div>

            <div className="flex w-5/6 rounded-xl justify-center h-max p-1 mb-2">
              <CalendarChart objData={accountList} />
            </div>
          </div>
          <div className="flex px-4 flex-col w-full center-items justify-center">
            <div className="flex h-full items-center shadow-xl shadow-slate-100/50 flex-col justify-center bg-slate-500 rounded-3xl text-slate-50 font-medium">
              <h1 className="rounded-tl-2xl font-thin text-3xl py-2 flex justify-center items-center rounded-tr-2xl bg-slate-700 w-full">
                Budgets
              </h1>
              <div className="flex w-full h-full rounded items-center justify-center">
                <div
                  className="flex max-w-max h-full items-center justify-center rounded shadow-2xl shadow-slate-500 m-1 p-3 "
                  style={{ minWidth: "100px" }}
                >
                  <BudgetItem
                    budgetList={budgetList}
                    accountList={accountList}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex h-full items-center shadow-xl shadow-slate-100/50 flex-col justify-center bg-slate-500 rounded-3xl text-slate-50 font-medium">
              <h1 className="rounded-tl-2xl font-thin text-3xl py-2 flex justify-center items-center rounded-tr-2xl bg-slate-700 w-full">
                Account Data Tables
              </h1>
              <div className="flex w-full justify-center content-center p-2 items-center">
                {accountNamesList.length > 0 ? (
                  <div className="flex flex-col w-full">
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
                      monthlyExpensesBalance={monthlyExpensesBalance}
                      monthlyExpenses={monthlyExpenses}
                      lineData={lineData}
                      accountNamesList={accountNamesList}
                    />
                  </div>
                ) : (
                  // Render a loading indicator or message when accountNamesList is empty
                  <div>Loading account names...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
