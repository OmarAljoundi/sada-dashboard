import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { PlusIcon } from "@radix-ui/react-icons";
import { Separator } from "./separator";
import { Badge } from "./badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import { BsCheck } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Info } from "lucide-react";

export interface SelectWithSearchProps {
  error?: string | boolean;
  label?: string;
  include_label?:boolean;
  disabled?:boolean
  value: string;
  options?: { label: string; value: any }[];
  field: string;
  placeholder?: string;
  onChange: (key: string, data?: string) => void;
}

const SelectWithSearch = React.forwardRef<
  HTMLInputElement,
  SelectWithSearchProps
>(({ value, label, error, field, placeholder,include_label = true,disabled=false, onChange, options }, ref) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="grid gap-y-2 w-full relative">
          {label && include_label  && (
            <Label className={cn(error && "text-red-500")}>{label}</Label>
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
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            className={cn(
              error && "border-2 border-red-500",
              "text-left w-full  cursor-pointer h-10"
            )}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            {label}

            <Separator orientation="vertical" className="mx-2 h-4" />
            {options
              ?.filter((option) => value == option.value)
              .map((option) => (
                <Badge
                  variant="secondary"
                  key={option.value}
                  className="rounded-sm px-1 font-normal  text-[10px] truncate"
                >
                  {option.label}
                </Badge>
              ))}
            <div className="hidden space-x-1 lg:flex gap-2 truncate"></div>
            {error && <span className="bg-red-500 text-[10px]">{error}</span>}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder} className="mr-4" />
          <CommandList>
            <CommandEmpty>لاتوجد نتائج</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => {
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (value == option.value) {
                        onChange(field, undefined);
                      } else {
                        onChange(field, option.value);
                      }
                    }}
                  >
                    <BsCheck
                      className={cn(
                        "ml-2 text-green-600 flex h-4 w-4 items-center justify-center opacity-0 transition-all duration-500",
                        value == option.value ? "opacity-100" : "opacity-0"
                      )}
                    />

                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {value && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() => onChange(field, undefined)}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
SelectWithSearch.displayName = "SelectWithSearch";

export { SelectWithSearch };
