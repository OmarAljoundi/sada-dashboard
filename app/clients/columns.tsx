"use client";
import { compareAsc, format, formatDistance } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Clients, Currency, Reservations } from "@/db_types";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ClientActions } from "./actions";
import GetClientTotalCost from "@/components/custom/get-client-total-cost";

export const columns: ColumnDef<Clients>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Type" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("type")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Name" />
    ),
    cell: ({ row }) => <div className="w-full">{row.getValue("name")}</div>,
    filterFn: (row, id, value) => {
      return true;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="w-full">{row.getValue("email")}</div>,
    filterFn: (row, id, value) => {
      return true;
    },
    sortingFn: () => {
      return 1;
    },
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone Number" />
    ),
    cell: ({ row }) => (
      <div className="w-full">{row.getValue("phone_number")}</div>
    ),
    filterFn: (row, id, value) => {
      return true;
    },
  },
  {
    accessorKey: "reservations",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reservations" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] truncate">
        {(row.getValue("reservations") as Reservations[])?.length}
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "reservations",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Costs" />
    ),
    cell: ({ row, table }) => {
      return (
        <div className="w-[120px] truncate">
          <GetClientTotalCost
            client_id={row.getValue("id")}
            currecny={(row.getValue("currency") as Currency)?.symbol ?? ""}
          />
        </div>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "currency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">
        {(row.getValue("currency") as Currency)?.symbol}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] truncate">
        {format(new Date(row.getValue("created_at")), "yyyy-MM-dd")}
      </div>
    ),
    filterFn: (row, id, value) => {
      return true;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <ClientActions row={row} />,
  },
];
