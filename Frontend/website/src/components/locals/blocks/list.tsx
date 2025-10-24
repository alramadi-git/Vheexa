"use client";

import type { ComponentProps, JSX } from "react";
import { FullHDImage } from "./image";
import { useTranslations } from "next-intl";

type tList<tItem> = Omit<ComponentProps<"div">, "children"> & {
  items: Array<tItem>;
  render: (item: tItem) => JSX.Element;

  loading: {
    isLoading: boolean;
    render: (value: null, index: number, array: number[]) => JSX.Element;
  };
  error: {
    isError: boolean;
    render?: JSX.Element;
  };
  empty?: JSX.Element;
};

export function List<tItem>({
  items,
  render,
  loading,
  error,
  empty,
  ...props
}: tList<tItem>) {
  if (loading.isLoading)
    return <ListSkeleton render={loading.render} {...props} />;
  if (error?.isError) return error.render ?? <Error />;

  if (items.length === 0) return empty ?? <Empty />;
  return <div {...props}>{items.map(render)}</div>;
}

type tListSelectionProps = Omit<ComponentProps<"div">, "children"> & {
  render: (value: null, index: number, array: number[]) => JSX.Element;
};

function ListSkeleton({ render, ...props }: tListSelectionProps) {
  const arr = new Array(10).fill(null);
  return <div {...props}>{arr.map(render)}</div>;
}

function Empty() {
  const t = useTranslations("app.components.list.empty");

  return (
    <div className="flex size-full flex-col items-center">
      <FullHDImage
        src={t("illustrations.src")}
        alt={t("illustrations.alt")}
        className="size-[460px] object-contain"
      />

      <p className="text-center text-2xl">{t("title")}</p>
    </div>
  );
}

function Error() {
  const t = useTranslations("app.components.list.error");

  return (
    <div className="flex size-full flex-col items-center">
      <FullHDImage
        src={t("illustrations.src")}
        alt={t("illustrations.alt")}
        className="size-[460px] object-contain"
      />

      <p className="text-center text-2xl">{t("title")}</p>
    </div>
  );
}
