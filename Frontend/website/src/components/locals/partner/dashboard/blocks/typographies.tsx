import { ComponentProps } from "react";

import { cn } from "@/utilities/cn";

import {
  Title as BlockTitle,
  Description as BlockDescription,
} from "@/components/locals/blocks/typography";

function Title({ className, ...props }: ComponentProps<typeof BlockTitle>) {
  return <BlockTitle className={cn("text-2xl", className)} {...props} />;
}

function Description({
  className,
  ...props
}: ComponentProps<typeof BlockDescription>) {
  return <BlockDescription className={cn("text-base", className)} {...props} />;
}

export { Title, Description };
