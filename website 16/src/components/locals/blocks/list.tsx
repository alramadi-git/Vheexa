import type { ComponentProps, JSX } from "react";

export function List<tItem>({
  items,
  render,
  whenEmpty,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  items: Array<tItem>;
  render: (item: tItem) => JSX.Element;
  whenEmpty?: JSX.Element;
}) {
  if (items.length === 0) return whenEmpty;
  return <div {...props}>{items.map(render)}</div>;
}

export function ListSkeleton({
  length: length,
  render,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  length: number;
  render: (value: number, index: number, array: number[]) => JSX.Element;
}) {
  const arr = new Array(length).fill(null);
  return <div {...props}>{arr.map(render)}</div>;
}
