import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { db, auth } from "../config/firebase";
import TransactionTable from "@/components/TransactionTable";
import { useOutletContext } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import TransactionInputDialog from "@/components/TransactionInputDialog";
import CreateBudgetDialog from "@/components/CreateBudgetDialog copy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <h2 className='text-4xl font-bold ml-8'>Welcome back!</h2>
        <div className='flex justify-start ml-10 mb-1'>
          <TransactionInputDialog
            uid={uid}
            triggerFetch={triggerFetch}
            setTriggerFetch={setTriggerFetch}
            accountList={accountList}
            setAccountList={setAccountList}
            setBudgetAccount={setBudgetAccount}
            budgetAccount={budgetAccount}
          />
        </div>
        <div className='flex justify-start ml-10'>
          <CreateBudgetDialog
            uid={uid}
            triggerFetch={triggerFetch}
            setTriggerFetch={setTriggerFetch}
            accountList={accountList}
            setAccountList={setAccountList}
            setBudgetAccount={setBudgetAccount}
            budgetAccount={budgetAccount}
          />
        </div>

        <Accordion
          type='multiple'
          collapsible
          className='flex w-full flex-col mt-2 items-center '
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger className='justify-center rounded shadow bg-white pt-2 pb-2 pl-3 pr-3 m-2 text-lg'>
              Debit Account Transaction History
            </AccordionTrigger>
            <AccordionContent className='ml-6 mr-6 '>
            
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
          <AccordionItem value='item-2' className='w-1/4'>
            <AccordionTrigger className='justify-center rounded shadow bg-white pt-2 pb-2 pl-3 pr-3 m-2 text-lg'>
              Savings Account Transaction History
            </AccordionTrigger>
            <AccordionContent className='ml-6 mr-6 '>
              {" "}
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger className='rounded shadow bg-white pt-2 pb-2 pl-3 pr-3 m-2 text-lg'>
              How can I save money with no job?
            </AccordionTrigger>
            <AccordionContent className='ml-6 mr-6'>
              Step 1. Get a job!
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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
