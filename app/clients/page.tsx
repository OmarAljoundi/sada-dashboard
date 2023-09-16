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
import { Order, SearchQuery, eFilterOperator } from "@/helper-types";
import { BaseResponse } from "@/base-response";
import { Clients } from "@/db_types";
import { http } from "@/service/httpService";
import { DateRange } from "react-day-picker";

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
  const getClientsData = async () => {
    var _SQ: SearchQuery = {
      FilterByOptions: [],
      OrderByOptions: [],
      PageIndex: pagination.pageIndex,
      PageSize: pagination.pageSize,
      Select:
        "*,currency(symbol),reservations(id,reservation_costs(client_id,amount,amount_omr))",
      Table: "clients",
    };
    columnFilters?.map((i) => {
      if (i.id == "created_at") {
        var date_ranage = i.value as DateRange;
        _SQ.FilterByOptions.push({
          FilterFor: date_ranage.from,
          FilterOperator: eFilterOperator.GreaterThanOrEquals,
          MemberName: "created_at",
        });
        if (date_ranage.to)
          _SQ.FilterByOptions.push({
            FilterFor: date_ranage.to,
            FilterOperator: eFilterOperator.LessThanOrEquals,
            MemberName: "created_at",
          });
      } else if (typeof i.value === "object") {
        _SQ.FilterByOptions.push({
          MemberName: i.id,
          FilterOperator: eFilterOperator.EqualsToList,
          FilterFor: `(${(i.value as string[]).join(",")})`,
        });
      }
    });
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
