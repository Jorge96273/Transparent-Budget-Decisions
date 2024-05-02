import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { db, auth } from "../config/firebase";
import TransactionTable from "@/components/TransactionTable";
import { useOutletContext } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
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

          let formatted = totalDeposits - totalWithdrawals;

          setLineData((lineData) => [
            ...lineData,
            { dates: date, balances: formatted },
          ]);
        }
      });
    }
  };

  const monthlyCalendarfunction = () => {
    if (monthlyExpenses) {
      console.log(`Monthly expenses: ${monthlyExpenses}`);
      const monthlyExpenseData = monthlyExpenses.map((item) => ({
        transactionDate: item.newTransactionDate,
        transactionName: item.newTransactionName,
        transactionAmount: item.newTransactionAmount,
      }));
      console.log(monthlyExpenseData);
      setMonthlyCalendar(monthlyExpenseData);
    }
  };
  console.log("***MONTHLY CALENDER***", monthlyCalendar);
  console.log("***MONTHLY CALENDER 2***", monthlyCalendar)

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
      monthlyCalendarfunction();
  }, [accountList, budgetTriggerFetch]);

  return (
    <>
      <div
        className="w-full"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <CalendarChart
          sampleData={monthlyCalendar}
          happensMonthly={true}
        />
        <TransactionInputDialog
          uid={uid}
          triggerFetch={triggerFetch}
          setTriggerFetch={setTriggerFetch}
          accountList={accountList}
          setAccountList={setAccountList}
          setBudgetList={setBudgetList}
          budgetList={budgetList}
        />
        <CreateBudgetDialog
          uid={uid}
          triggerFetch={triggerFetch}
          setTriggerFetch={setTriggerFetch}
          accountList={accountList}
          setAccountList={setAccountList}
          setBudgetList={setBudgetList}
          budgetList={budgetList}
        />{" "}
        <BudgetSheet
          accountList={accountList}
          budgetList={budgetList}
          uid={uid}
          triggerFetch={triggerFetch}
          setTriggerFetch={setTriggerFetch}
          budgetTriggerFetch={budgetTriggerFetch}
          setBudgetTriggerFetch={setBudgetTriggerFetch}
        />{" "}
        <MonthlyExpensesSheet
          uid={uid}
          triggerFetch={triggerFetch}
          setTriggerFetch={setTriggerFetch}
          accountList={accountList}
          setAccountList={setAccountList}
          monthlyExpenses={monthlyExpenses}
        />
      </div>
      <br></br> <br></br>
      <BudgetItem budgetList={budgetList} accountList={accountList} />
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
    </>
  );
};

export default Dashboard;
