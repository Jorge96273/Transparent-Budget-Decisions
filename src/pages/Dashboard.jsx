import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { db, auth } from "../config/firebase";
import { useOutletContext } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import TransactionInputDialog from "@/components/TransactionInputDialog";
import CreateBudgetDialog from "@/components/CreateBudgetDialog";
import { AccordionElement } from "@/components/Accordion";
import BudgetItem from "@/components/BudgetItem";
import CalendarChart from "@/components/CalendarChart";
import { BudgetSheet } from "@/components/BudgetSheet";
import { MonthlyExpensesSheet } from "@/components/MonthlyExpenseSheet";
import AccountBalances from "@/components/AccountBalances";
import { DonutChart, Legend } from "@tremor/react";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  // const [lineData, setLineData] = useState([{ dates: "", balances: 0 }]);
  const [lineData, setLineData] = useState([]);
  const [debitLine, setDebitLine] = useState([]);
  const [creditLine, setCreditLine] = useState([]);
  const [savingsLine, setSavingsLine] = useState([]);
  const [monthlyCalendar, setMonthlyCalendar] = useState([]);

  // const [date, setDate] = useState([])
  // const [balance, setBalance] = useState([])
  const uid = user?.uid;
  const {
    triggerFetch,
    setTriggerFetch,
    accountList,
    setAccountList,
    budgetList,
    setBudgetList,
    budgetTriggerFetch,
    setBudgetTriggerFetch,
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
      setBudgetList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBudgetList();
  }, [accountList, budgetTriggerFetch]);

  const debitAccount = accountList.filter(
    (account) => account.accountType === "Debit"
  );
  const creditAccount = accountList.filter(
    (account) => account.accountType === "Credit"
  );
  const savingsAccount = accountList.filter(
    (account) => account.accountType === "Savings"
  );
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
  const category = "Total";
  const year = lineData.map((item) => item.dates);
  const amounts = lineData.map((item) => item.balances);

  const debitCategory = "Debit";
  const debitYear = debitLine.map((item) => item.dates);
  const debitAmounts = debitLine.map((item) => item.balances);

  const creditCategory = "Credit";
  const creditYear = creditLine.map((item) => item.dates);
  const creditAmounts = creditLine.map((item) => item.balances);

  const savingsCategory = "Savings";
  const savingsYear = savingsLine.map((item) => item.dates);
  const savingsAmounts = savingsLine.map((item) => item.balances);

  const lineGraphAccount = (accountType) => {
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    if (accountList) {
      let sorted = accountList.sort((a, b) =>
        a.newTransactionDate.localeCompare(b.newTransactionDate)
      );
      if (accountType === "Debit") {
        setDebitLine([]);
      } else if (accountType === "Credit") {
        setCreditLine([]);
      } else if (accountType === "Savings") {
        setSavingsLine([]);
      }
      sorted.forEach((transaction) => {
        if (transaction.accountType === accountType) {
          if (transaction.newTransactionType === "Withdrawal") {
            totalWithdrawals += Number(transaction.newTransactionAmount);
            let date = transaction.newTransactionDate;

            let formatted = totalDeposits - totalWithdrawals;

            if (accountType === "Debit") {
              setDebitLine((lineData) => [
                ...lineData,
                { dates: date, balances: formatted },
              ]);
            } else if (accountType === "Credit") {
              setCreditLine((lineData) => [
                ...lineData,
                { dates: date, balances: formatted },
              ]);
            } else if (accountType === "Savings") {
              setSavingsLine((lineData) => [
                ...lineData,
                { dates: date, balances: formatted },
              ]);
            }
          } else if (transaction.newTransactionType === "Deposit") {
            totalDeposits += Number(transaction.newTransactionAmount);
            let date = transaction.newTransactionDate;

            let formatted = totalDeposits - totalWithdrawals;

            if (accountType === "Debit") {
              setDebitLine((lineData) => [
                ...lineData,
                { dates: date, balances: formatted },
              ]);
            } else if (accountType === "Credit") {
              setCreditLine((lineData) => [
                ...lineData,
                { dates: date, balances: formatted },
              ]);
            } else if (accountType === "Savings") {
              setSavingsLine((lineData) => [
                ...lineData,
                { dates: date, balances: formatted },
              ]);
            }
          }
        }
      });
    }
  };

  const getTotalBalance = () => {
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    if (accountList) {
      let sorted = accountList.sort((a, b) =>
        a.newTransactionDate.localeCompare(b.newTransactionDate)
      );
      setLineData([]);
      sorted.forEach((transaction) => {
        if (transaction.newTransactionType === "Withdrawal") {
          totalWithdrawals += Number(transaction.newTransactionAmount);
          let date = transaction.newTransactionDate;

          let formatted = totalDeposits - totalWithdrawals;

          setLineData((lineData) => [
            ...lineData,
            { dates: date, balances: formatted },
          ]);
        } else if (transaction.newTransactionType === "Deposit") {
          totalDeposits += Number(transaction.newTransactionAmount);
          let date = transaction.newTransactionDate;

          let formatted = totalDeposits + totalWithdrawals;

          setLineData((lineData) => [
            ...lineData,
            { dates: date, balances: formatted },
          ]);
        }
      });
    }
  };

  // const monthlyCalendarfunction = () => {
  //   if (monthlyExpenses) {
  //     console.log(`Monthly expenses: ${monthlyExpenses}`);
  //     const monthlyExpenseData = monthlyExpenses.map((item) => ({
  //       transactionDate: item.newTransactionDate,
  //       transactionName: item.newTransactionName,
  //       transactionAmount: item.newTransactionAmount,
  //     }));
  //     console.log(monthlyExpenseData);
  //     setMonthlyCalendar(monthlyExpenseData);
  //   }
  // };
  // console.log("***MONTHLY CALENDER***", monthlyCalendar);
  // // console.log("***MONTHLY CALENDER 2***", monthlyCalendar)

  useEffect(() => {
    if (!firstRenderRef.current) {
      getAccountList(); // Call getAccountList on subsequent renders
    }
    firstRenderRef.current = false; // Ensure this runs only once after the first render
  }, [triggerFetch]);

  useEffect(() => {
    if (user) {
      getAccountList(); // Call getAccountList on initial render or when user changes
    }
  }, [user]);

  useEffect(() => {
    getTotalBalance(),
      lineGraphAccount("Debit"),
      lineGraphAccount("Credit"),
      lineGraphAccount("Savings");
  }, [accountList, budgetTriggerFetch]);

  return (
    <>
      <div className='flex flex-col w-100 p-2 overflow-hidden animate-in slide-in-from-bottom duration-1000 '>
        <div className="bg-slate-600  m-4 rounded-3xl">
          <div className='w-full flex flex-col items-center justify-center '>
            <h1 className="bg-slate-800 text-slate-50 w-full py-2 font-thin text-3xl rounded-tl-2xl rounded-tr-2xl flex items-center justify-center">Dashboard</h1>
        <h1 className="text-slate-50 flex justify-center w-full rounded-tl-xl rounded-tr-xl p-2 text-xl">Welcome Back, {user?.displayName? user.displayName : "User"}!</h1>
            <div className='flex w-full justify-center h-max'>
              <div className='flex items-center flex-col justify-center p-1 mb-4 h-max rounded '>
                <div className="bg-slate-400 shadow-xl shadow-slate-400/50 rounded-tl-2xl rounded-xl pb-1">

                <h3 className="rounded-tl-xl font-light text-2xl rounded-tr-xl bg-slate-700 text-slate-50 justify-center flex w-full p-2">Account Balance</h3>
                <AccountBalances
                  currentAccountBalance={currentAccountBalance}
                  accountList={accountList}
                  />
                  </div>
              </div>
            </div>
            <div className='p-2 flex w-full items-center justify-center'>
              <div className='mx-2'>
                <TransactionInputDialog
                  uid={uid}
                  triggerFetch={triggerFetch}
                  setTriggerFetch={setTriggerFetch}
                  accountList={accountList}
                  setAccountList={setAccountList}
                  setBudgetList={setBudgetList}
                  budgetList={budgetList}
                />
              </div>
              <div className='mx-2'>
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
                <div className='mx-2'>
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
                <div className='mx-2'>
                  <MonthlyExpensesSheet
                    uid={uid}
                    triggerFetch={triggerFetch}
                    setTriggerFetch={setTriggerFetch}
                    accountList={accountList}
                    setAccountList={setAccountList}
                    monthlyExpenses={monthlyExpenses}
                    budgetList={budgetList}
                  />
                </div>
              ) : null}
            </div>
            <div className='flex w-3/4 justify-center h-max p-1 mb-2 rounded '>
              <CalendarChart objData={accountList} />
            </div>
          </div>
          <div className="flex px-4 flex-col w-full center-items justify-center">
            <div className='flex items-center shadow-xl flex-col justify-center bg-slate-500 rounded-3xl text-slate-50 font-medium'>
            
            <h1 className="rounded-tl-2xl font-thin text-3xl py-2 flex justify-center items-center rounded-tr-2xl bg-slate-700 w-full">
              Account Data Tables
              </h1> 
            <div className='flex w-full rounded items-center justify-center'>
              <div className='flex w-max h-max items-center justify-center rounded shadow-2xl shadow-slate-500 m-1 p-3 '>
                <BudgetItem budgetList={budgetList} accountList={accountList} />
              </div>
            </div>
            </div>
          </div>
          <div className='p-2 '>
            <div className='flex w-full justify-center content-center items-center'>
              <div className='flex flex-col w-full'>
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
                  debitAccount={debitAccount}
                  savingsAccount={savingsAccount}
                  creditAccount={creditAccount}
                  monthlyExpensesBalance={monthlyExpensesBalance}
                  monthlyExpenses={monthlyExpenses}
                  lineData={lineData}
                  category={category}
                  amounts={amounts}
                  year={year}
                  debitCategory={debitCategory}
                  debitAmounts={debitAmounts}
                  debitYear={debitYear}
                  savingsCategory={savingsCategory}
                  savingsAmounts={savingsAmounts}
                  savingsYear={savingsYear}
                  creditCategory={creditCategory}
                  creditAmounts={creditAmounts}
                  creditYear={creditYear}
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
