"use client";

import { tCallback } from "@/types/array";
import { ComponentProps, JSX } from "react";

import { useTranslations } from "next-intl";
import { FullHDImage } from "./image";

function Empty() {
  const tEmpty = useTranslations("components.list.empty");

  return (
    <div className="flex size-full flex-col items-center">
      <FullHDImage
        src={tEmpty("illustrations.src")}
        alt={tEmpty("illustrations.alt")}
        className="size-[460px] object-contain"
      />

      <p className="text-center text-2xl">{tEmpty("title")}</p>
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

function Error() {
  const tError = useTranslations("components.list.error");

  return (
    <div className="flex size-full flex-col items-center">
      <FullHDImage
        src={tError("illustrations.src")}
        alt={tError("illustrations.alt")}
        className="size-[460px] object-contain"
      />

      <p className="text-center text-2xl">{tError("title")}</p>
    </div>
  );
}

enum eListStatus {
  loading,
  success,
  failed,
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
  if (status === eListStatus.loading) return <ListLoading {...whenLoading} />;

  if (status === eListStatus.success) return <ListSuccess {...whenSuccess} />;

  return whenFailed ?? <Error />;
}

export { eListStatus };
export default List;
