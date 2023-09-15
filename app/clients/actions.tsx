"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotification } from "@/components/ui/notification";
import { supabaseClient } from "@/lib/supabaseClient";
import { useQueryClient } from "react-query";

interface ClientActionsProps<TData> {
  row: Row<TData>;
}

export function ClientActions<TData>({ row }: ClientActionsProps<TData>) {
  const { error: message, success } = useNotification();

  const queryClient = useQueryClient();
  const handleDelete = async () => {
    const { data, error } = await supabaseClient
      .from("clients")
      .delete()
      .eq("id", row.getValue("id"));
    if (error) message(error.details);
    else {
      await queryClient.refetchQueries();
      success("Client deleted successfully!");
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
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete()}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
