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
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  label?: string | null | boolean;
  include_label?: boolean;
  div_className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      include_label = true,
      div_className = "",
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className={div_className}>
        {include_label && (
          <Label htmlFor={props.id} className={cn(error && "text-red-500")}>
            {label}
          </Label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              `flex h-10 w-full rounded-md border border-input bg-background 
              px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent
              file:text-sm file:font-medium placeholder:text-muted-foreground 
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-ring focus-visible:ring-offset-2 ring-orange-500
              disabled:cursor-not-allowed disabled:opacity-50`,
              className,
              error && "border-2 border-red-500",
              "duration-300 transition-all"
            )}
            ref={ref}
            {...props}
          />
        </div>
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
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
