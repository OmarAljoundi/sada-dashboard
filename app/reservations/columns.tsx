"use client";
import { compareAsc, format, formatDistance } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Clients, Reservations } from "@/db_types";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ReservationActions } from "@/app/reservations/actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CreateEditClient from "@/components/dialogs/create-edit-client";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { getProfit, getRemaining } from "@/lib/utils";

export const columns: ColumnDef<Reservations>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Number" />
    ),
    cell: ({ row }) => <div className="w-[80px]">#{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "clients",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          <span className="max-w-[6rem] truncate">
            {(row.getValue("clients") as Clients)?.name}
          </span>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <CreateEditClient
                  mode="Edit"
                  client={row.getValue("clients") as Clients}
                >
                  <Button size={"icon"} variant={"ghost"}>
                    <Info className="w-5" />
                  </Button>
                </CreateEditClient>
              </TooltipTrigger>
              <TooltipContent className="z-50 bg-black">
                <span className="text-black text-sm font-bold ">
                  Quickly add new client
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return true;
    },
  },
  {
    accessorKey: "clients.phone_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          <span className="max-w-[6rem] truncate">
            {(row.getValue("clients") as Clients)?.phone_number}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return true;
    },
  },
  {
    accessorKey: "check_in",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check in" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] truncate">
        {format(new Date(row.getValue("check_in")), "yyyy-MM-dd")}
      </div>
    ),
    filterFn: (row, id, value) => {
      return true;
    },
  },
  {
    accessorKey: "check_out",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check out" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] truncate">
        {format(new Date(row.getValue("check_out")), "yyyy-MM-dd")}
      </div>
    ),
    filterFn: (row, id, value) => {
      return true;
    },
  },
  {
    accessorKey: "sold_by",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sold By" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] truncate">{row.getValue("sold_by")}</div>
    ),
    filterFn: (row, id, value) => {
      return true;
    },
  },
  {
    accessorKey: "sales_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales Price" />
    ),
    cell: ({ row }) => (
      <div className="w-[40px]">{row.getValue("sales_price")}</div>
    ),
  },
  {
    accessorKey: "total_profit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profit" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[100px] line-clamp-4 truncate">
          {getProfit(row.original)}
        </div>
      );
    },
  },
  {
    accessorKey: "total_remaning",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remaning" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[100px] line-clamp-4 truncate">
          {getRemaining(row.original)}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] truncate ">
        {format(new Date(row.getValue("created_at")), "yyyy-MM-dd")}
      </div>
    ),
    filterFn: (row, id, value) => {
      return true;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <ReservationActions row={row} />,
  },
];
