"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";
import {
  DataTableFacetedFilter,
  FacetedOptions,
} from "./data-table-faceted-filter";
import { DataTableDateFilter } from "@/components/table/data-table-date-filter";
import { useQuery } from "react-query";
import { supabaseClient } from "@/lib/supabaseClient";
import { User } from "@/db_types";
import { DataTableSearchInput } from "./data-table-search-input";
import { ReactNode } from "react";
import { CLIENTS_TYPE, COUNTRIES } from "@/constants";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  create_link: string;
  trigger?: ReactNode;
  refetch?: string;
}

export function DataTableToolbar<TData>({
  table,
  create_link,
  trigger,
  refetch,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const getUsers = async (): Promise<FacetedOptions[]> => {
    const { data } = await supabaseClient.from("users").select("*");
    return data?.map((i) => {
      return {
        label: i.name,
        value: i.name,
      };
    }) as FacetedOptions[];
  };

  const { data: _response } = useQuery("Users", async () => await getUsers(), {
    refetchInterval: false,
    enabled: !!table.getColumn("type"),
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center flex-wrap gap-y-2">
        {table.getColumn("clients") && (
          <DataTableSearchInput
            column={table.getColumn("clients")}
            placeholder="Search by name or phone number.."
          />
        )}

        {table.getColumn("name") && (
          <DataTableSearchInput
            column={table.getColumn("name")}
            placeholder="Search by name.."
          />
        )}

        {table.getColumn("check_in") && (
          <DataTableDateFilter
            column={table.getColumn("check_in")}
            title="Check in"
          />
        )}

        {table.getColumn("check_out") && (
          <DataTableDateFilter
            column={table.getColumn("check_out")}
            title="Check out"
          />
        )}

        {table.getColumn("created_at") && (
          <DataTableDateFilter
            column={table.getColumn("created_at")}
            title="Created At"
          />
        )}
        {table.getColumn("sold_by") && (
          <DataTableFacetedFilter
            column={table.getColumn("sold_by")}
            title="Sold by"
            options={_response ?? []}
          />
        )}
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Customer Type"
            options={CLIENTS_TYPE}
          />
        )}
        {table.getColumn("countries") && (
          <DataTableFacetedFilter
            column={table.getColumn("countries")}
            title="Countries"
            options={COUNTRIES.map((x) => {
              return {
                label: x.name,
                value: x.name,
              };
            })}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <DataTableViewOptions
          table={table}
          create_link={create_link}
          trigger={trigger}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
