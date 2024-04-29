import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { db, auth } from "../config/firebase";
import TransactionTable from "@/components/TransactionTable";
import { useOutletContext } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import TransactionInputDialog from "@/components/TransactionInputDialog";
import CreateBudgetDialog from "@/components/CreateBudgetDialog copy";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const uid = user?.uid;
  const { triggerFetch, setTriggerFetch, accountList, setAccountList } =
    useOutletContext();
  const [budgetAccount, setBudgetAccount] = useState([]);
  console.log("DSH BUDGET", budgetAccount);
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
      setBudgetAccount(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBudgetList();
  }, [accountList]);

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
      <div>
        <TransactionInputDialog
          uid={uid}
          triggerFetch={triggerFetch}
          setTriggerFetch={setTriggerFetch}
          accountList={accountList}
          setAccountList={setAccountList}
          setBudgetAccount={setBudgetAccount}
          budgetAccount={budgetAccount}
        />
        <br></br>
        <CreateBudgetDialog
          uid={uid}
          triggerFetch={triggerFetch}
          setTriggerFetch={setTriggerFetch}
          accountList={accountList}
          setAccountList={setAccountList}
          setBudgetAccount={setBudgetAccount}
          budgetAccount={budgetAccount}
        />
        <br></br>
        <div className='p-2 m-4 rounded flex flex-col items-center bg-blue-200 shadow-md'>
          <h3 className='font-boldp-2 rounded '>
            Debit Account Transaction History
          </h3>
          <TransactionTable
            uid={uid}
            triggerFetch={triggerFetch}
            setTriggerFetch={setTriggerFetch}
            accountList={accountList}
            setAccountList={setAccountList}
            accountTable={debitAccount}
          />
        </div>
        <br></br>
        <div className='p-2 m-4 rounded flex flex-col items-center bg-blue-200 shadow-md'>
          <h3>Savings Account Transaction History</h3>
          <TransactionTable
            uid={uid}
            triggerFetch={triggerFetch}
            setTriggerFetch={setTriggerFetch}
            accountList={accountList}
            setAccountList={setAccountList}
            accountTable={savingsAccount}
          />
        </div>
        <br></br>
        <div className='p-2 m-4 rounded flex flex-col items-center bg-blue-200 shadow-md'>
          <h3>Credit Card Transaction History</h3>
          <TransactionTable
            uid={uid}
            triggerFetch={triggerFetch}
            setTriggerFetch={setTriggerFetch}
            accountList={accountList}
            setAccountList={setAccountList}
            accountTable={creditAccount}
          />
        </div>
        <br></br>
        <div className='p-2 m-4 rounded flex flex-col items-center bg-blue-200 shadow-md'>
          <h3>Monthly Expenses</h3>
          <TransactionTable
            uid={uid}
            triggerFetch={triggerFetch}
            setTriggerFetch={setTriggerFetch}
            accountList={accountList}
            setAccountList={setAccountList}
            accountTable={monthlyExpenses}
          />
        </div>

        <br></br>
        <div className='p-2 m-4 rounded flex flex-col items-center bg-blue-200 shadow-md'>
          <h3>All Transactions</h3>
          <TransactionTable
            uid={uid}
            triggerFetch={triggerFetch}
            setTriggerFetch={setTriggerFetch}
            accountList={accountList}
            setAccountList={setAccountList}
            accountTable={accountList}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
