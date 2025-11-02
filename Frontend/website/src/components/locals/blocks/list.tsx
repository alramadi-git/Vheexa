"use client";

import type { ComponentProps, JSX } from "react";

import { useTranslations } from "next-intl";
import { FullHDImage } from "./image";
import { tCallback } from "@/types/array";

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

type tListSuccessProps<tItem> = Omit<ComponentProps<"div">, "children"> & {
  items: Array<tItem>;
  render: tCallback<tItem, JSX.Element>;

  whenEmpty?: JSX.Element;
};
function ListSuccess<tItem>({
  items,
  render,
  whenEmpty,
  ...props
}: tListSuccessProps<tItem>) {
  if (items.length === 0) return whenEmpty ?? <Empty />;
  return <div {...props}>{items.map(render)}</div>;
}

type tListLoadingProps = Omit<ComponentProps<"div">, "children"> & {
  itemsLength: number;
  render: tCallback<null, JSX.Element>;
};
function ListLoading({ itemsLength, render, ...props }: tListLoadingProps) {
  const arr = new Array(itemsLength).fill(null);
  return <div {...props}>{arr.map(render)}</div>;
}

function Failed() {
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

enum eListStatus {
  LOADING,
  SUCCESS,
  FAILED,
}
type tList<tItem> = {
  status: eListStatus;
  whenLoading: tListLoadingProps;
  whenSuccess: tListSuccessProps<tItem>;
  whenFailed?: JSX.Element;
};

function List<tItem>({
  status,
  whenLoading,
  whenSuccess,
  whenFailed,
}: tList<tItem>) {
  if (status === eListStatus.LOADING) return <ListLoading {...whenLoading} />;

  if (status === eListStatus.SUCCESS) return <ListSuccess {...whenSuccess} />;

  return whenFailed ?? <Failed />;
}

export { eListStatus };
export default List;
