import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        `
        flex w-full min-h-[130px]
        rounded-2xl
        border border-slate-200
        bg-white
        px-4 py-3
        text-sm text-slate-700
        placeholder:text-slate-400
        shadow-sm
        transition-all duration-300

        hover:border-emerald-300
        hover:shadow-md

        focus:outline-none
        focus:ring-4
        focus:ring-emerald-100
        focus:border-emerald-500
        focus:shadow-lg

        resize-none

        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:bg-slate-100

        scrollbar-thin
        scrollbar-thumb-slate-300
        scrollbar-track-transparent
        `,
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };