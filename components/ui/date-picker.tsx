import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import { DayPicker } from "react-day-picker";
import { Label } from "./label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export interface DateProps {
  error?: string | boolean;
  onChange?: (key: string, d?: Date) => void;
  value?: Date;
  id?: string;
  disabled_button?: boolean;
  field: string;
  label?: string;
  include_label?: boolean;
  disabled?: (date: Date) => boolean;
}
const DatePicker = React.forwardRef<HTMLInputElement, DateProps>(
  (
    {
      error,
      include_label = false,
      onChange,
      value,
      disabled = false,
      disabled_button = false,
      field,
      id,
      label,
    },
    ref
  ) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="grid gap-y-2 w-full relative">
            {include_label && (
              <Label htmlFor={id} className={cn(error && "text-red-500")}>
                {label}
              </Label>
            )}
            {error && (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="absolute right-0 -top-1 font-bold text-red-500 cursor-pointer w-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-red-500 text-sm font-bold ">
                      {error}
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <div className="relative w-full">
              <Button
                disabled={disabled_button}
                type="button"
                id={id}
                variant={"outline"}
                className={cn(
                  " justify-start text-left font-normal text-xs w-full",
                  !value && "text-muted-foreground",
                  error && "border-2 border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? (
                  format(new Date(value), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            disabled={disabled}
            mode="single"
            selected={value}
            onSelect={(e) => onChange!(field, e)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
