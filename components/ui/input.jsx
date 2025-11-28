import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-[15px] text-blue-900 placeholder:text-slate-400 transition-all duration-300 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium shadow-sm hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/10 focus-visible:border-blue-500 focus-visible:-translate-y-0.5 focus-visible:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-slate-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };