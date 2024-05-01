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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo } from "react";
import { UpdateBudgetDialog } from "./UpdateBudgetDialog";

function BudgetsTable({
  uid,
  triggerFetch,
  setTriggerFetch,
  setBudgetList,
  budgetList,
  budgetTriggerFetch,
  setBudgetTriggerFetch,
}) {
  const deleteBudget = async (id) => {
    await deleteDoc(doc(db, `budget/${uid}/newBudget`, id));
    toast.success("Budget deleted successfully");
    setTriggerFetch(!triggerFetch);
  };

  function transformBudgetList(list) {
    return list.map((budget) => {
      return {
        budgetName: budget.newBudget,
        budgetAmount: budget.newBudgetAmount,
        budgetId: String(budget.id),
      };
    });
  }

  const columns = [
    {
      accessorKey: "budgetName",
      header: "Budget Name",
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue("budgetName")}
        </div>
      ),
    },
    {
      accessorKey: "budgetAmount",
      header: () => <div className="text-center">Budget Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("budgetAmount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "updateBudget",
      header: () => <div className="text-center">Update Budget</div>,
      cell: ({ row }) => {
        const budgetID = row.getValue("budgetId");
        const budgetedName = row.getValue("budgetName");
        const budgetedAmount = row.getValue("budgetAmount");

        return (
          <div className="items-center">
            <UpdateBudgetDialog
              budgetID={budgetID}
              budgetedName={budgetedName}
              budgetedAmount={budgetedAmount}
              uid={uid}
              setBudgetTriggerFetch={setBudgetTriggerFetch}
              budgetTriggerFetch={budgetTriggerFetch}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "budgetId",
      header: () => <div className="text-center">Delete Budget</div>,
      cell: ({ row }) => {
        const budgetID = row.getValue("budgetId");
        return (
          <div className="text-center">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => deleteBudget(budgetID)}
            >
              Delete Budget
            </button>
          </div>
        );
      },
    },
  ];

  // const data = useMemo(() => transformAccountList(accountList), [accountList]);
  const data = useMemo(() => transformBudgetList(budgetList), [budgetList]);

  //* utilizes the useMemo hook from React to memoize the result of the transformAccountList function, which is applied to the accountList variable. This means that the transformAccountList function will only be executed when the accountList changes, rather than on every render of the component. This is particularly useful for optimizing performance, especially when dealing with expensive computations or large datasets.

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
export default BudgetsTable;
