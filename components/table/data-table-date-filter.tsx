import * as React from "react";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";

interface DataTableDateFilter<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export function DataTableDateFilter<TData, TValue>({
  column,
  title,
}: DataTableDateFilter<TData, TValue>) {
  React.useEffect(() => {
    console.log("column?.getFilterValue()", column?.getFilterValue());
  }, []);

  return (
    <div className={cn("grid xl:gap-2 w-1/2 lg:w-1/3 xl:w-1/4")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[calc(100%-10px)]  justify-start text-left font-normal h-8 border-dashed "
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {(column?.getFilterValue() as DateRange)?.from ? (
              (column?.getFilterValue() as DateRange)?.to ? (
                <>
                  {format(
                    (column!.getFilterValue() as DateRange).from as Date,
                    "LLL dd, y"
                  )}{" "}
                  -{" "}
                  {format(
                    (column?.getFilterValue() as DateRange).to as Date,
                    "LLL dd, y"
                  )}
                </>
              ) : (
                format(
                  (column!.getFilterValue() as DateRange).from as Date,
                  "LLL dd, y"
                )
              )
            ) : (
              <span>{title}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={column?.getFilterValue() as DateRange}
            onSelect={column?.setFilterValue}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
