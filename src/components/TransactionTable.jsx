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
} from "firebase/firestore";
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
import { TransAmtDialog } from "@/components/TransAmtDialog";

function TransactionTable() {
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

  const transactionCollectionRef = collection(db, `${uid}`);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

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

  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, `${uid}`, id));
    toast.success("Account deleted successfully");
    setTriggerFetch(!triggerFetch);
  };

  const updateTransaction = async (id) => {
    const accountRef = doc(db, `${uid}`, id);
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
    return list.map((transaction) => {
      // console.log(transaction.id); // Directly log the transaction.id
      return {
        accountType: transaction.accountType,
        accountBalance: transaction.accountBalance,
        transactionName: transaction.newTransactionName,
        transactionAmount: transaction.newTransactionAmount,
        transactionDate: transaction.newTransactionDate,
        transactionType: transaction.newTransactionType,
        monthlyExpense: transaction.monthlyExpense,
        transactionId: String(transaction.id),
      };
    });
  }

  const columns = [
    {
      accessorKey: "accountType",
      header: "Account Type",
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue("accountType")}
        </div>
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

        return <div className="text-center font-medium">{formatted}</div>;
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

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "updateTransaction",
      header: () => <div className="text-center">Update Transaction</div>,
      cell: ({ row }) => {
        const transactionID = row.getValue("transactionId");

        return (
          <div className="items-center">
            <TransAmtDialog
              updateTransaction={updateTransaction}
              transactionID={transactionID}
              uid={uid}
              setTriggerFetch={setTriggerFetch}
              triggerFetch={triggerFetch}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "transactionDate",
      header: "Transaction Date",
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue("transactionDate")}
        </div>
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
        <div className="capitalize text-center">
          {row.getValue("monthlyExpense")}
        </div>
      ),
    },
    {
      accessorKey: "transactionId",
      header: () => <div className="text-center">Delete Transaction</div>,
      cell: ({ row }) => {
        const transactionID = row.getValue("transactionId");

        return (
          <div className="text-center">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => deleteTransaction(transactionID)}
            >
              Delete Transaction
            </button>
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
    <>
      <div className="App"></div>
      <h3>Transaction History</h3>
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader className="text-center">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-center">
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
                    className="text-center"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
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
                    className="h-24 text-right"
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
export default TransactionTable;
