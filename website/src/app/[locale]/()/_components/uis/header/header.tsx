"use client";

import { useState } from "react";
import { cn } from "@/utilities/cn";
import { useTranslations } from "next-intl";
import { useScroll, useMotionValueEvent } from "motion/react";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/shadcn/button";

type TNavLinks = Array<{
  url: string;
  label: string;
}>;

const MAX_Y_SCROLL: number = 50;

export default function Header() {
  const t = useTranslations("app.page.header");

  const { scrollY } = useScroll();
  const [menuState, setMenuState] = useState(false);
  const [isExceededMaxYScroll, setIsExceededMaxYScroll] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const IS_EXCEEDED_MAX_Y_SCROLL = y > MAX_Y_SCROLL;

    if (isExceededMaxYScroll !== IS_EXCEEDED_MAX_Y_SCROLL)
      setIsExceededMaxYScroll(IS_EXCEEDED_MAX_Y_SCROLL);
  });

  const NAV_LINKS: TNavLinks = t.raw("nav.links");

  return (
    <header
      className="fixed z-20 w-full px-2"
      data-state={menuState && "active"}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl rounded-2xl transition-all duration-300",
          {
            "bg-background/50 mt-2 max-w-4xl border backdrop-blur-lg lg:px-5":
              isExceededMaxYScroll,
          },
        )}
      >
        <div className="relative flex h-16 flex-wrap items-center justify-between gap-6 p-3 lg:gap-0 lg:p-4">
          <div className="flex w-full items-center justify-between lg:w-auto">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                priority
                width="32"
                height="32"
                alt={t("logo.alternate")}
                src={t("logo.url")}
              />
            </Link>

            <Button
              size="icon"
              variant="ghost"
              aria-label={menuState == true ? "Close Menu" : "Open Menu"}
              className="relative z-20 block cursor-pointer lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
              <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
            </Button>
          </div>

          <nav
            className="absolute inset-0 m-auto hidden size-fit lg:block"
          >
            <ul className="flex gap-8">
              {NAV_LINKS.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.url}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            className="bg-background mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 in-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:in-data-[state=active]:flex dark:shadow-none dark:lg:bg-transparent"
          >
            <div className="lg:hidden">
              <ul className="space-y-6">
                {NAV_LINKS.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.url}
                      className="text-muted-foreground hover:text-primary block duration-150"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
              <Button
                asChild
                size="sm"
                variant="outline"
                className={cn({ "lg:hidden": isExceededMaxYScroll })}
              >
                <Link href="/auth/signin">
                  <span>Sign In</span>
                </Link>
              </Button>

              <Button
                asChild
                size="sm"
                className={cn({ "lg:hidden": isExceededMaxYScroll })}
              >
                <Link href="/auth/signup">
                  <span>Sign Up</span>
                </Link>
              </Button>

              <Button
                asChild
                size="sm"
                className={cn("hidden", {
                  "lg:inline-flex": isExceededMaxYScroll,
                })}
              >
                <Link href="/auth/signup">
                  <span>Get Started</span>
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
