"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotification } from "@/components/ui/notification";
import { supabaseClient } from "@/lib/supabaseClient";
import { QueryClient, useQueryClient } from "react-query";
import Link from "next/link";

interface ReservationActionsProps<TData> {
  row: Row<TData>;
}

export function ReservationActions<TData>({
  row,
}: ReservationActionsProps<TData>) {
  const { error: message, success } = useNotification();

  const queryClient = useQueryClient();
  const handleDelete = async () => {
    const { data, error } = await supabaseClient
      .from("reservations")
      .delete()
      .eq("id", row.getValue("id"));
    if (error) message(error.details);
    else {
      queryClient.refetchQueries();
      success("Reservation deleted successfully!");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href={`/reservations/${row.getValue("id")}`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => handleDelete()}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
