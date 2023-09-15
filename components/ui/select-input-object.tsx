import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
export interface SelectInputProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  error?: string | boolean;
  label?: string | null | boolean;
  include_label?: boolean;
  options?: { label: any; value: any }[];
  field?: string;
  onValueChange?: (key: string, value: string) => void;
}

const SelectInputObject = React.forwardRef<HTMLInputElement, SelectInputProps>(
  (
    {
      className,
      type,
      options = [],
      label,
      include_label = true,
      field,
      onValueChange,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="grid gap-y-2 w-full relative">
        {include_label && (
          <Label htmlFor={props.id} className={cn(error && "text-red-500")}>
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
                <span className="text-red-500 text-sm font-bold ">{error}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <div className={cn(className, "relative")}>
          <Select
            name={props.name}
            disabled={props.disabled}
            onValueChange={(e) => onValueChange!(field!, e)}
            defaultValue={props.value as any}
          >
            <SelectTrigger className={cn(error && "border-2 border-red-500")}>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }
);
SelectInputObject.displayName = "SelectInputObject";

export { SelectInputObject };
