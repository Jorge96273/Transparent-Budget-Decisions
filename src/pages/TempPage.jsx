import { useEffect, useState, useRef } from "react";
import { Auth } from "../components/auth";
import { db, auth } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate, Navigate } from "react-router-dom";
import LoginDialogTemplate from "@/components/LoginDialogTemplate";
import SignupDialogTemplate from "@/components/SignupDialogTemplate";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

import { useCallback } from "react";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo } from "react";

function App() {
  //! added trigger to prevent infinite loop for rerendering accounts
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [accountList, setAccountList] = useState([]);
  //!  Had to deconstruct to properly get user!!!!!
  const [user, loading] = useAuthState(auth);
  const uid = user?.uid; // Correctly get the uid from the user object
  const [accountType, setAccountType] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [newTransactionName, setNewTransactionName] = useState("");
  const [newTransactionDate, setNewTransactionDate] = useState("");
  const [newTransactionType, setNewTransactionType] = useState("withdrawl");
  const [newTransactionAmount, setNewTransactionAmount] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(false);
  const [updatedTransactionAmount, setUpdatedTransactionAmount] =
    useState(newTransactionAmount);

  const firstRenderRef = useRef(true);

  const transactionCollectionRef = collection(
    db,
    `${uid}/SAVINGS/transactions`
  );

  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const addTransaction = async () => {
    const docRef = await addDoc(transactionCollectionRef, {
      accountType,
      accountBalance,
      newTransactionName,
      newTransactionAmount,
      newTransactionDate,
      newTransactionType,
      monthlyExpense,
      //   !NEED TO FIX TIMESTAMP
      createdAt: serverTimestamp(),
    });
    setTriggerFetch(!triggerFetch);
    setAccountType(""),
      setAccountBalance(0),
      setNewTransactionName(""),
      setNewTransactionAmount(0),
      setNewTransactionDate(""),
      setNewTransactionType(""),
      setMonthlyExpense(false),
      console.log("Document written with ID: ", docRef.id);
  };

  const getAccountList = async () => {
    try {
      const data = await getDocs(collection(db, `${uid}/SAVINGS/transactions`));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAccountList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, `${uid}/SAVINGS/transactions`, id));
    toast.success("Account deleted successfully");
    setTriggerFetch(!triggerFetch);
  };

  const updateTransaction = async (id) => {
    const accountRef = doc(db, `${uid}/SAVINGS/transactions`, id);
    await updateDoc(accountRef, {
      newTransactionAmount: updatedTransactionAmount,
    });
    toast.success("Account balance updated successfully");
    setTriggerFetch(!triggerFetch);
  };

  const debouncedSetAccountType = useCallback(
    debounce((value) => setAccountType(value), 300),
    []
  );
  const debouncedSetAccountBalance = useCallback(
    debounce((value) => setAccountBalance(value), 300),
    []
  );
  const debouncedSetNewTransactionName = useCallback(
    debounce((value) => setNewTransactionName(value), 300),
    []
  );
  const debouncedSetNewTransactionAmount = useCallback(
    debounce((value) => setNewTransactionAmount(value), 300),
    []
  );
  const debouncedSetNewTransactionDate = useCallback(
    debounce((value) => setNewTransactionDate(value), 300),
    []
  );
  const debouncedSetNewTransactionType = useCallback(
    debounce((value) => setNewTransactionType(value), 300),
    []
  );
  const debouncedSetMonthlyExpense = useCallback(
    debounce((value) => setMonthlyExpense(value), 300),
    []
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

  function transformAccountList(list) {
    return list.map((transaction) => ({
      accountType: transaction.accountType,
      accountBalance: transaction.accountBalance,
      transactionName: transaction.newTransactionName,
      transactionAmount: transaction.newTransactionAmount,
      transactionDate: transaction.newTransactionDate,
      transactionType: transaction.newTransactionType,
      monthlyExpense: transaction.monthlyExpense,
      transactionId: transaction.id,
    }));
  }

  const columns = [
    {
      accessorKey: "accountType",
      header: "Account Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("accountType")}</div>
      ),
    },
    {
      accessorKey: "accountBalance",
      header: () => <div className="text-right">Account Balance</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("accountBalance"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "transactionName",
      header: "Transaction Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("transactionName")}</div>
      ),
    },
    {
      accessorKey: "transactionAmount",
      header: () => <div className="text-right">Transaction Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("transactionAmount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "transactionDate",
      header: "Transaction Date",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("transactionDate")}</div>
      ),
    },
    {
      accessorKey: "transactionType",
      header: "Transaction Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("transactionType")}</div>
      ),
    },
    {
      accessorKey: "monthlyExpense",
      header: "Monthly Expense",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("monthlyExpense")}</div>
      ),
    },
    {
      accessorKey: "transactionId",
      header: () => <div className="text-right">Delete Transaction</div>,
      cell: ({ row }) => {
        const transactionID = parseFloat(row.getValue("transactionId"));
        return (
          <div className="flex justify-between items-center">
            <Button onClick={() => deleteTransaction(transactionID)}>
              Delete Transaction
            </Button>
          </div>
        );
      },
    },
  ];

  const data = useMemo(() => transformAccountList(accountList), [accountList]);

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  console.log("Data", data); // Add this line to inspect the data structure

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    // !  END OF CODE

    <>
      <div className="App">
        <Auth />
        <h3>Add a Transaction</h3>
        <div>
          <input
            type="text"
            placeholder="Account Type"
            onChange={(e) => debouncedSetAccountType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Account Balance"
            onChange={(e) => debouncedSetAccountBalance(e.target.value)}
          />
          <input
            type="text"
            placeholder="Transaction Name"
            onChange={(e) => debouncedSetNewTransactionName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Transaction Amount"
            onChange={(e) => debouncedSetNewTransactionAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Transaction Date"
            onChange={(e) => debouncedSetNewTransactionDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Withdrawl or Deposit"
            onChange={(e) => debouncedSetNewTransactionType(e.target.value)}
          />
          <input
            type="checkbox"
            checked={monthlyExpense}
            onChange={(e) =>
              debouncedSetMonthlyExpense(Number(e.target.checked))
            }
          />
          <label>Monthly Expense </label>
          <></>
          <Button onClick={addTransaction}>Submit Account</Button>
        </div>
        <h3>Transaction History</h3>
        <div>
          {accountList.map((transaction) => (
            <div key={transaction.id}>
              <p
                style={{
                  color:
                    transaction.newTransactionType === "Withdrawl"
                      ? "red"
                      : "green",
                }}
              >
                <span>
                  Account: {transaction.accountType} | Account Balance: $
                  {transaction.accountBalance}| Transaction:{" "}
                  {transaction.newTransactionName} | Transaction Amount: $
                  {transaction.newTransactionAmount}| Transaction Date:{" "}
                  {transaction.newTransactionDate} | Transaction Type:{" "}
                  {transaction.newTransactionType} | Monthly Expense:{" "}
                  {transaction.monthlyExpense} |
                </span>
              </p>
              <Button
                key={transaction.id}
                onClick={() => deleteTransaction(transaction.id)}
              >
                Delete Transaction
              </Button>
              <input
                placeholder="Updated Balance"
                type="number"
                onChange={(e) =>
                  setUpdatedTransactionAmount(Number(e.target.value))
                }
              />
              <Button onClick={() => updateTransaction(transaction.id)}>
                Update Balance
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="App">
        <Auth />
        <h3>Add a Transaction</h3>
        <div>
          <input
            type="text"
            placeholder="Account Type"
            onChange={(e) => debouncedSetAccountType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Account Balance"
            onChange={(e) => debouncedSetAccountBalance(e.target.value)}
          />
          <input
            type="text"
            placeholder="Transaction Name"
            onChange={(e) => debouncedSetNewTransactionName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Transaction Amount"
            onChange={(e) => debouncedSetNewTransactionAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Transaction Date"
            onChange={(e) => debouncedSetNewTransactionDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Withdrawl or Deposit"
            onChange={(e) => debouncedSetNewTransactionType(e.target.value)}
          />
          <input
            type="checkbox"
            checked={monthlyExpense}
            onChange={(e) =>
              debouncedSetMonthlyExpense(Number(e.target.checked))
            }
          />
          <label>Monthly Expense </label>
          <></>
          <Button onClick={addTransaction}>Submit Account</Button>
        </div>
        <h3>Transaction History</h3>
        <div>
          {accountList.map((transaction) => (
            <div key={transaction.id}>
              <p
                style={{
                  color:
                    transaction.newTransactionType === "Withdrawl"
                      ? "red"
                      : "green",
                }}
              >
                <span>
                  Account: {transaction.accountType} | Account Balance: $
                  {transaction.accountBalance}| Transaction:{" "}
                  {transaction.newTransactionName} | Transaction Amount: $
                  {transaction.newTransactionAmount}| Transaction Date:{" "}
                  {transaction.newTransactionDate} | Transaction Type:{" "}
                  {transaction.newTransactionType} | Monthly Expense:{" "}
                  {transaction.monthlyExpense} |
                </span>
              </p>
              <Button
                key={transaction.id}
                onClick={() => deleteTransaction(transaction.id)}
              >
                Delete Transaction
              </Button>
              <input
                placeholder="Updated Balance"
                type="number"
                onChange={(e) =>
                  setUpdatedTransactionAmount(Number(e.target.value))
                }
              />
              <Button onClick={() => updateTransaction(transaction.id)}>
                Update Balance
              </Button>
            </div>
          ))}
        </div>
      </div>
      <h3>Transaction History</h3>
      <div className="w-75">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
export default App;
