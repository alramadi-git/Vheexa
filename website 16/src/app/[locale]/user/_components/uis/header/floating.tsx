"use client";

import type { PropsWithChildren } from "react";
import { useState } from "react";
import { cn } from "@/utilities/cn";
import { useTranslations } from "next-intl";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";
import { FullHDImage } from "@/components/locals/blocks/image";

const maxYScroll: number = 50;

type TFloatingProps = PropsWithChildren & {};
export default function Floating(props: TFloatingProps) {
  const t = useTranslations("app.user.layout.header");

  const { scrollY } = useScroll();
  const [menuState, setMenuState] = useState(false);
  const [isUserExceededMaxYScroll, setIsExceededMaxYScroll] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const isYExceededMaxYScroll = y > maxYScroll;

    if (isUserExceededMaxYScroll !== isYExceededMaxYScroll)
      setIsExceededMaxYScroll(isYExceededMaxYScroll);
  });

  return (
    <header
      className="fixed top-10 left-1/2 z-20 container mx-auto -translate-1/2"
      data-state={menuState && "active"}
    >
      <div
        className={cn(
          "relative mx-auto max-w-full rounded-2xl transition-all duration-300",
          {
            "bg-background mt-2 max-w-6xl border lg:px-5 shadow-lg outline-2 outline-primary": isUserExceededMaxYScroll,
          },
        )}
      >
        <div className="relative flex h-16 w-full flex-wrap items-center justify-between gap-6 p-3 lg:gap-0 lg:p-4">
          <div className="flex w-full items-center">
            <Link href="/" className="me-6 flex items-center space-x-2">
              <FullHDImage
                priority
                src={t("logo.src")}
                alt={t("logo.alt")}
                className="size-8 dark:invert"
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
