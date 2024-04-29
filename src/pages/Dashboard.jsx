import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { db, auth } from "../config/firebase";
import TransactionTable from "@/components/TransactionTable";
import { useOutletContext } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import TransactionInputDialog from "@/components/TransactionInputDialog";
import CreateBudgetDialog from "@/components/CreateBudgetDialog";
import BudgetsTable from "@/components/BudgetsTable";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
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

  return (
    <>
      <div>Dashboard</div>
      <TransactionInputDialog
        uid={uid}
        triggerFetch={triggerFetch}
        setTriggerFetch={setTriggerFetch}
        accountList={accountList}
        setAccountList={setAccountList}
        setBudgetList={setBudgetList}
        budgetList={budgetList}
      />
      <br></br>
      <CreateBudgetDialog
        uid={uid}
        triggerFetch={triggerFetch}
        setTriggerFetch={setTriggerFetch}
        accountList={accountList}
        setAccountList={setAccountList}
        setBudgetList={setBudgetList}
        budgetList={budgetList}
      />
      <br></br>
      <BudgetsTable
        setBudgetList={setBudgetList}
        budgetList={budgetList}
        uid={uid}
        triggerFetch={triggerFetch}
        setTriggerFetch={setTriggerFetch}
        budgetTriggerFetch={budgetTriggerFetch}
        setBudgetTriggerFetch={setBudgetTriggerFetch}
      />
      <h3>Debit Account Transaction History</h3>
      <TransactionTable
        uid={uid}
        triggerFetch={triggerFetch}
        setTriggerFetch={setTriggerFetch}
        accountList={accountList}
        setAccountList={setAccountList}
        accountTable={debitAccount}
      />
      <br></br>
      <h3>Savings Account Transaction History</h3>
      <TransactionTable
        uid={uid}
        triggerFetch={triggerFetch}
        setTriggerFetch={setTriggerFetch}
        accountList={accountList}
        setAccountList={setAccountList}
        accountTable={savingsAccount}
      />
      <br></br>
      <h3>Credit Card Transaction History</h3>
      <TransactionTable
        uid={uid}
        triggerFetch={triggerFetch}
        setTriggerFetch={setTriggerFetch}
        accountList={accountList}
        setAccountList={setAccountList}
        accountTable={creditAccount}
      />
      <br></br>
      <h3>Monthly Expenses</h3>
      <TransactionTable
        uid={uid}
        triggerFetch={triggerFetch}
        setTriggerFetch={setTriggerFetch}
        accountList={accountList}
        setAccountList={setAccountList}
        accountTable={monthlyExpenses}
      />
      <br></br>
      <h3>All Transactions</h3>
      <TransactionTable
        uid={uid}
        triggerFetch={triggerFetch}
        setTriggerFetch={setTriggerFetch}
        accountList={accountList}
        setAccountList={setAccountList}
        accountTable={accountList}
      />
    </>
  );
};

export default Dashboard;
