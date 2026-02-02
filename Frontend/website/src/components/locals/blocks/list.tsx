"use client";

import { ComponentProps, ReactNode } from "react";

import { useTranslations } from "next-intl";
import { FullHDImage } from "./images";

function Empty() {
  const tEmpty = useTranslations("components.list.empty");

  return (
    <div className="flex size-full flex-col items-center">
      <FullHDImage
        src={tEmpty("illustrations.src")}
        alt={tEmpty("illustrations.alt")}
        className="size-[460px] object-contain"
      />

      <p className="text-center text-2xl">{tEmpty("label")}</p>
    </div>
  );
}

type tListSuccessProps<tItem> = Omit<ComponentProps<"div">, "children"> & {
  items: Array<tItem>;
  render: (value: tItem, index: number, array: Array<tItem>) => ReactNode;

  whenEmpty?: ReactNode;
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
  render: (value: null, index: number, array: Array<null>) => ReactNode;
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

      <p className="text-center text-2xl">{tError("label")}</p>
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
  whenFailed?: ReactNode;
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
