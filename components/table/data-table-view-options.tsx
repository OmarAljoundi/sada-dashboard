"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { PlusIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { Recycle } from "lucide-react";
import { useQuery, useQueryClient } from "react-query";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  create_link?: string;
  trigger?: ReactNode;
  refetch?: string;
}

export function DataTableViewOptions<TData>({
  table,
  create_link,
  trigger,
  refetch,
}: DataTableViewOptionsProps<TData>) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const refetchData = async () => {
    setLoading(true);
    await queryClient.refetchQueries({
      queryKey: refetch,
    });
    setLoading(false);
  };
  return (
    <div className="flex gap-2 justify-end">
      {create_link && (
        <Link href={create_link}>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex  border-dashed"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Create new
          </Button>
        </Link>
      )}

      {trigger}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex  border-dashed"
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      {refetch && (
        <Button
          disabled={loading}
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex  border-dashed"
          onClick={() => refetchData()}
        >
          <Recycle className="mr-2 h-4 w-4" />
          Refetch
        </Button>
      )}
    </div>
  );
}
