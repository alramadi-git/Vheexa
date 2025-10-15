"use client";
import { useTranslations } from "next-intl";

import { Input } from "@/components/shadcn/input";
import { SearchIcon } from "lucide-react";
import { Kbd } from "@/components/locals/blocks/typography";
import { useEffect, useRef } from "react";
import { tNullable } from "@/types/nullish";

export default function Search() {
  const ref = useRef<tNullable<HTMLInputElement>>(null);
  const t = useTranslations("app.user.layout.header");

  useEffect(() => {
    const controller = new AbortController();

    window.addEventListener(
      "keydown",
      (event) => {
        if (
          !((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")
        ) {
          return;
        }

        event.preventDefault();
        ref.current?.focus();
      },
      {
        signal: controller.signal,
      },
    );

    return () => controller.abort();
  }, []);

  return (
    <div className="relative me-auto w-full max-w-xs">
      <Input
        ref={ref}
        className="peer h-8 ps-8 pe-10"
        placeholder={t("search-placeholder")}
        type="search"
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
        <Kbd>⌘K</Kbd>
      </div>
    </div>
  );
}
