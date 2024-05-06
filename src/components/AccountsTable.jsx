import * as React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
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
import { useMemo, useCallback } from "react";

function AccountsTable({
  uid,
  accountList,
  budgetList,
  triggerFetch,
  setTriggerFetch,
  setBudgetList,
  accountNamesList,
  accountTriggerFetch,
  setAccountTriggerFetch,
}) {
  // Wrap the deleteAccount function in useCallback to prevent unnecessary re-renders
  const deleteAccount = useCallback(
    async (id) => {
      await deleteDoc(doc(db, `account/${uid}/newAccount`, id));
      setAccountTriggerFetch(!accountTriggerFetch);
      console.log("DELETE ACCOUNT ACCOUNT STABLE");
    },
    [uid, accountTriggerFetch, setAccountTriggerFetch]
  );
  // * Maps through list of account type objects and set the accountType and AccountID to the values
  const data = accountNamesList.map((accountType) => ({
    accountType: accountType.accountName,
    accountID: accountType.id,
  }));
  //  Sets the columns and values for each row
  const columns = [
    {
      accessorKey: "accountType",
      header: "Account Name",
      //* Pulls the data from data.accountType to fill the table
      cell: ({ row }) => (
        <div className="capitalize text-center">
          {row.getValue("accountType")}
        </div>
      ),
    },

    {
      accessorKey: "accountID",
      header: () => <div className="text-center">Delete Account</div>,
      //* Pulls the data from data.accountID to use as parameter in the delete account method
      cell: ({ row }) => {
        const accountID = row.getValue("accountID");
        return (
          <div className="text-center">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => deleteAccount(accountID)}
            >
              Delete Account
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
export default AccountsTable;
