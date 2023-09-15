"use client";
import { DataTable } from "@/components/table/data-table";
import { useQuery } from "react-query";
import { useNotification } from "@/components/ui/notification";
import React from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { supabaseClient } from "@/lib/supabaseClient";
import { columns } from "./columns";
import CreateEditClient from "@/components/dialogs/create-edit-client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Order, SearchQuery } from "@/helper-types";
import { BaseResponse } from "@/base-response";
import { Clients } from "@/db_types";
import { http } from "@/service/httpService";

const ClientsPage = () => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { error } = useNotification();
  const getClientsData = async (
    page_index: number = 0,
    page_size: number = 10
  ) => {
    var _SQ: SearchQuery = {
      FilterByOptions: [],
      OrderByOptions: [],
      PageIndex: page_index,
      PageSize: page_size,
      Select: "*,currency(symbol,conversion_rate),reservations(id)",
      Table: "clients",
    };
    sorting?.map((i) => {
      _SQ.OrderByOptions.push({
        MemberName: i.id,
        SortOrder: i.desc ? Order.DESC : Order.ASC,
      });
    });

    const response = (await http("reservation/search").post(
      _SQ
    )) as BaseResponse<Clients>;

    if (!response.success) throw new Error(response.message);

    console.log("response", response.results);
    return response.results;
  };

  const { data: _response, isLoading } = useQuery(
    ["Clients", columnFilters, pagination],
    async () => await getClientsData(),
    {
      refetchInterval: false,
      onError(err) {
        error(`The data couldnt be loaded: ${err}`);
      },
    }
  );

  return (
    <div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <DataTable
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          setSorting={setSorting}
          sorting={sorting}
          data={_response ?? []}
          columns={columns}
          total={_response?.length ?? 0}
          create_link=""
          setPagination={setPagination}
          pagination={pagination}
          isLoading={isLoading}
          refetch="Clients"
          trigger={
            <CreateEditClient mode="Add">
              <Button
                variant="outline"
                size="sm"
                className="ml-auto hidden h-8 lg:flex"
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Create new
              </Button>
            </CreateEditClient>
          }
        />
      </div>
    </div>
  );
};

export default ClientsPage;
