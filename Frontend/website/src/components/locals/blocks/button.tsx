"use client";

import { ComponentProps, useState } from "react";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/utilities/cn";

type tBurgerMenuProps = ComponentProps<typeof Button>;
function BurgerMenu({ className, ...props }: tBurgerMenuProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Button
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className={cn("group", className)}
      onClick={() => setOpen((prevState) => !prevState)}
      {...props}
    >
      <svg
        className="pointer-events-none size-full"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12L20 12"
          className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        />
        <path
          d="M4 12H20"
          className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        />
        <path
          d="M4 12H20"
          className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        />
      </svg>
    </Button>
  );
}

export { BurgerMenu };
