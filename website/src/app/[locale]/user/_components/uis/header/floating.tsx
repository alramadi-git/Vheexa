"use client";

import type { PropsWithChildren } from "react";

import { useState } from "react";
import { cn } from "@/utilities/cn";
import { useTranslations } from "next-intl";
import { useScroll, useMotionValueEvent } from "motion/react";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import Link from "@/components/locals/blocks/next-intl-link";

type TFloating = {
  props: PropsWithChildren;
};

const MAX_Y_SCROLL: number = 50;

export default function Floating(props: TFloating["props"]) {
  const t = useTranslations("app.page.header");

  const { scrollY } = useScroll();
  const [menuState, setMenuState] = useState(false);
  const [isExceededMaxYScroll, setIsExceededMaxYScroll] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const IS_EXCEEDED_MAX_Y_SCROLL = y > MAX_Y_SCROLL;

    if (isExceededMaxYScroll !== IS_EXCEEDED_MAX_Y_SCROLL)
      setIsExceededMaxYScroll(IS_EXCEEDED_MAX_Y_SCROLL);
  });

  return (
    <header
      className="fixed z-20 w-full px-2"
      data-state={menuState && "active"}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl rounded-2xl transition-all duration-300",
          {
            "bg-background mt-2 max-w-4xl border lg:px-5": isExceededMaxYScroll,
          },
        )}
      >
        <div className="relative flex h-16 w-full flex-wrap items-center justify-between gap-6 p-3 lg:gap-0 lg:p-4">
          <div className="flex w-full items-center">
            <Link href="/" className="me-6 flex items-center space-x-2">
              <Image
                priority
                width="32"
                height="32"
                alt={t("logo.alternate")}
                src={t("logo.url")}
              />
            </Link>

            {props.children}

            <Button
              size="icon"
              variant="ghost"
              aria-label={menuState == true ? "Close Menu" : "Open Menu"}
              className="relative z-20 ms-auto block cursor-pointer lg:hidden"
              onClick={() => setMenuState((oldState) => !oldState)}
            >
              <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
              <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
