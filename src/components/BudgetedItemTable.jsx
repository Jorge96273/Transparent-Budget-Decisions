// // import { useCallback } from "react";
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

function BudgetedItemTable({
  uid,
  accountList,
  budgetList,
  triggerFetch,
  setTriggerFetch,
  setBudgetList,

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

  // Caluclates the Amount Spent for Each Budget Category
  function budgetSpent(category) {
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    if (accountList) {
      accountList.forEach((transaction) => {
        if (transaction.selectBudget === category) {
          if (transaction.newTransactionType === "Withdrawl") {
            totalWithdrawals += Number(transaction.newTransactionAmount);
          } else if (transaction.newTransactionType === "Deposit") {
            totalDeposits += Number(transaction.newTransactionAmount);
          }
        }
      });
    }
    let recordedBalance = totalDeposits - totalWithdrawals;

    return recordedBalance;
  }

  // Sets the Data for each table row
  const data = budgetList.map((budget) => ({
    budgetName: budget.newBudget,
    budgetAmount: budget.newBudgetAmount,
    budgetId: String(budget.id),
    budgetSpent: budgetSpent(budget.newBudget),
    budgetRemaining: budget.newBudgetAmount + budgetSpent(budget.newBudget),
  }));
  //  Sets the columns and values for each row
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
      header: "Budget Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("budgetAmount"));
        // Formats number into USD style
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "budgetSpent",
      header: "Budget Spent",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("budgetSpent"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "budgetRemaining",
      header: "Budget Remaining",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("budgetRemaining"));
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
export default BudgetedItemTable;
