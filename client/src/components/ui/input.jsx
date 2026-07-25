import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all duration-150 ease-out",
        "placeholder:text-slate-400",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-700",
        "hover:border-slate-400",
        "focus-visible:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-0",
        "aria-[invalid=true]:border-rose-500 aria-[invalid=true]:ring-rose-500/40",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50 disabled:border-slate-200",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
