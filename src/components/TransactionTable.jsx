// import { useEffect, useState, useRef } from "react";
// import { Auth } from "../components/auth";
import { db } from "../config/firebase";
import {
  // getDocs,
  collection,
  // addDoc,
  deleteDoc,
  doc,
  updateDoc,
  // serverTimestamp,
} from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
// import { Button } from "react-bootstrap";
import UpdateTransactionDialog from "./UpdateTransactionDialog";

// import { useCallback } from "react";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "react-bootstrap";
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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

function TransactionTable({
  uid,
  triggerFetch,
  setTriggerFetch,
  accountList,
  setAccountList,
  accountTable,
  budgetList,
}) {
  const transactionCollectionRef = collection(db, `${uid}`);

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

  if (accountList) {
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
  }
  function transformAccountList(list) {
    return list.map((transaction) => {
      // console.log(transaction.id); // Directly log the transaction.id
      return {
        accountType: transaction.accountType,
        accountBalance: transaction.accountBalance,
        transactionName: transaction.newTransactionName,
        transactionAmount: [
          transaction.newTransactionAmount,
          transaction.newTransactionType,
        ],
        transactionDate: transaction.newTransactionDate,
        transactionType: transaction.newTransactionType,
        monthlyExpense: transaction.monthlyExpense,
        transactionId: String(transaction.id),
        budgetCategory: transaction.selectBudget,
      };
    });
  }

  const columns = [
    // {
    //   accessorKey: "accountType",
    //   header: "Account Type",
    //   cell: ({ row }) => (
    //     <div className="capitalize text-center">
    //       {row.getValue("accountType")}
    //     </div>
    //   ),
    // },
    //! *********** MUST FIX *****************
    // TODO FIX THE SORTING OF THE DOLLAR AMOUNT
    {
      accessorKey: "transactionAmount",
      header: ({ column }) => {
        return (
          <div className="d-flex align-items-center">
            <div className="text-center">Transaction Amount</div>
            {/* <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button> */}
          </div>
        );
      },
      cell: ({ row }) => {
        // Define your color variables
        const green = "#008000"; // Example green color
        const red = "#FF0000"; // Example red color
        const amountData = ("Transaction", row.getValue("transactionAmount"));

        // Correctly assign the color based on the transaction type
        const textColor = amountData[1] === "Withdrawal" ? red : green;

        const amount = parseFloat(amountData[0]);
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        // Conditionally prepend "-" if the transaction type is "Withdrawal"
        const formattedWithPrefix =
          amountData[1] === "Withdrawal" ? `- ${formatted}` : formatted;

        // Apply the text color to the cell content
        return (
          <div className="text-center font-medium" style={{ color: textColor }}>
            {formattedWithPrefix}
          </div>
        );
      },
    },

    {
      accessorKey: "updateTransaction",
      header: () => <div className="text-center">Update Transaction</div>,
      cell: ({ row }) => {
        const transactionID = row.getValue("transactionId");

        return (
          <div className="items-center">
            <UpdateTransactionDialog
              transactionID={transactionID}
              uid={uid}
              setTriggerFetch={setTriggerFetch}
              triggerFetch={triggerFetch}
              budgetList={budgetList}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "transactionName",
      header: ({ column }) => {
        return (
          <div className="d-flex align-items-center">
            <div className="text-center">Transaction Name</div>
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("transactionName")}</div>
      ),
    },
    // {
    //   accessorKey: "monthlyExpense",
    //   header: "Monthly Expense",
    //   cell: ({ row }) => (
    //     <div className="capitalize text-center">
    //       {row.getValue("monthlyExpense")}
    //     </div>
    //   ),
    // },

    {
      accessorKey: "transactionDate",
      header: ({ column }) => {
        return (
          <div className="d-flex align-items-center">
            <div className="text-center">Transaction Date</div>
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue("transactionDate")}
        </div>
      ),
    },
    // {
    //   accessorKey: "transactionType",
    //   header: ({ column }) => {
    //     return (
    //       <div className="d-flex align-items-center">
    //         <div className="text-center">Transaction Type</div>
    //         <Button
    //           variant="ghost"
    //           onClick={() =>
    //             column.toggleSorting(column.getIsSorted() === "asc")
    //           }
    //         >
    //           <ArrowUpDown className="ml-2 h-4 w-4" />
    //         </Button>
    //       </div>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("transactionType")}</div>
    //   ),
    // },
    // {
    //   accessorKey: "monthlyExpense",
    //   header: "Monthly Expense",
    //   cell: ({ row }) => (
    //     <div className="capitalize text-center">
    //       {row.getValue("monthlyExpense")}
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "budgetCategory",
    //   header: ({ column }) => {
    //     return (
    //       <div className="d-flex align-items-center">
    //         <div className="text-center">Budget Category</div>
    //         <Button
    //           variant="ghost"
    //           onClick={() =>
    //             column.toggleSorting(column.getIsSorted() === "asc")
    //           }
    //         >
    //           <ArrowUpDown className="ml-2 h-4 w-4" />
    //         </Button>
    //       </div>
    //     );
    //   },
    //   cell: ({ row }) => (
    //     <div className="capitalize text-center">
    //       {row.getValue("budgetCategory")}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "transactionId",
      header: () => <div className="text-center">Delete Transaction</div>,
      cell: ({ row }) => {
        const transactionID = row.getValue("transactionId");

        return (
          <div className="text-center">
            <button
              className="rounded-button-newuser"
              type="button"
              onClick={() => deleteTransaction(transactionID)}
            >
              {" "}
              Delete Transaction
            </button>
          </div>
        );
      },
    },
  ];

  // const data = useMemo(() => transformAccountList(accountList), [accountList]);
  const data = useMemo(
    () => transformAccountList(accountTable),
    [accountTable]
  );

  //* utilizes the useMemo hook from React to memorize the result of the transformAccountList function, which is applied to the accountList variable. This means that the transformAccountList function will only be executed when the accountList changes, rather than on every render of the component. This is particularly useful for optimizing performance, especially when dealing with expensive computations or large datasets.

  // used in sorting the table
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
      <div className="w-full">
        <div className="bg-slate-100 rounded">
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
