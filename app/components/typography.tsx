import { cn } from "@/lib/utils";
import React from "react";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function Title({ ...props }: TitleProps) {
  return (
    <h1
      className={cn(
        "text-white text-lg font-bold sm:text-xl md:text-2xl",
        props.className
      )}
      {...props}
    />
  );
}
