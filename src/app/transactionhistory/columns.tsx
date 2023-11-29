"use client"

import { TransactionHistory } from "@/components/mockdata"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<TransactionHistory>[] = [
    {
        accessorKey: "S/N",
        header: "S/No.",
      },
      {
        accessorKey: "Asset",
        header: "Asset",
      },
      {
        accessorKey: "Amount",
        header: "Amount",
      },
      {
        accessorKey: "APR",
        header: "APR",
      },
      {
        accessorKey: "Transaction Type",
        header: "Transaction Type",
      },
      {
        accessorKey: "Transaction Date",
        header: "Transaction Date",
      },
      {
        accessorKey: "Address",
        header: "Address",
      },
      {
        accessorKey: "Status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.Status;
      
            return (
              <span
                className={`${
                  status === "completed"
                    ? "text-green-500"
                    : status === "failed"
                    ? "text-red-500"
                    : status === "pending"
                    ? "text-blue-500"
                    : ""
                }`}
              >
                {status}
              </span>
            );
        }
      },
]
