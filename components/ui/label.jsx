import * as React from "react";

import { cn } from "./utils";

function Label({
  className,
  ...props
}) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none text-blue-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
}

export { Label };