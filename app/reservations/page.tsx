"use client";
import { DataTable } from "@/components/table/data-table";
import { columns } from "./columns";
import { useQuery } from "react-query";
import { Order, SearchQuery, eFilterOperator } from "@/helper-types";
import { http } from "@/service/httpService";
import { BaseResponse } from "@/base-response";
import { Reservations } from "@/db_types";
import { useNotification } from "@/components/ui/notification";
import React from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { DateRange } from "react-day-picker";

const ReservationsPage = () => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { error } = useNotification();
  const getReservationsData = async () => {
    var _SQ: SearchQuery = {
      FilterByOptions: [],
      OrderByOptions: [],
      PageIndex: pagination.pageIndex,
      PageSize: pagination.pageSize - 1,
      Select:
        "*,reservation_costs(*),reservation_bills(*),clients!inner(*,currency(*))",
      Table: "reservations",
    };

    columnFilters?.map((i) => {
      if (i.id == "clients") {
        _SQ.FilterByOptions.push({
          FilterFor: `%${i.value}%`,
          FilterOperator: eFilterOperator.Contains,
          MemberName: "clients.name",
        });
      }
      if (i.id == "check_in") {
        var date_ranage = i.value as DateRange;
        _SQ.FilterByOptions.push({
          FilterFor: date_ranage.from,
          FilterOperator: eFilterOperator.GreaterThanOrEquals,
          MemberName: "check_in",
        });
        if (date_ranage.to)
          _SQ.FilterByOptions.push({
            FilterFor: date_ranage.to,
            FilterOperator: eFilterOperator.LessThanOrEquals,
            MemberName: "check_in",
          });
      } else if (i.id == "check_out") {
        var date_ranage = i.value as DateRange;
        _SQ.FilterByOptions.push({
          FilterFor: date_ranage.from,
          FilterOperator: eFilterOperator.GreaterThanOrEquals,
          MemberName: "check_out",
        });
        if (date_ranage.to)
          _SQ.FilterByOptions.push({
            FilterFor: date_ranage.to,
            FilterOperator: eFilterOperator.LessThanOrEquals,
            MemberName: "check_out",
          });
      } else if (i.id == "created_at") {
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
    )) as BaseResponse<Reservations>;

    if (!response.success) throw new Error(response.message);

    response.total = Math.ceil(response.total / pagination.pageSize);
    return response;
  };

  const { data: _response, isLoading } = useQuery(
    ["Reservations", columnFilters, sorting, pagination],
    async () => await getReservationsData(),
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
          data={_response?.results ?? []}
          columns={columns}
          total={_response?.total ?? 0}
          setPagination={setPagination}
          pagination={pagination}
          refetch={"Reservations"}
          create_link="/create-new-reservation"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ReservationsPage;
