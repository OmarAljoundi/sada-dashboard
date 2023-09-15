import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import useDebounce from "@/hooks/useDebounce";

export type FacetedOptions = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};
interface DataTableSearchInputProp<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  placeholder?: string;
}

export function DataTableSearchInput<TData, TValue>({
  column,
  title,
  placeholder,
}: DataTableSearchInputProp<TData, TValue>) {
  const [value, setValue] = React.useState<string>("");
  const debouncedValue = useDebounce<string>(value, 750);

  React.useEffect(() => {
    column?.setFilterValue(value);
    console.log("SSSS", column);
  }, [debouncedValue]);

  React.useEffect(() => {
    if (column?.getFilterValue() == undefined) {
      setValue("");
    }
  }, [column?.getFilterValue()]);
  return (
    <div className="w-1/2 lg:w-1/3 xl:w-1/4">
      <Input
        include_label={false}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-8 w-[calc(100%-10px)]  border-dashed"
      />
    </div>
  );
}
