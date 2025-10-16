import type { ComponentProps, JSX } from "react";

export function List<tItem>({
  items,
  render,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  items: Array<tItem>;
  render: (item: tItem) => JSX.Element;
}) {
  return <div {...props}>{items.map(render)}</div>;
}

export function ListSkeleton<tItem>({
  length: length,
  render,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  length: number;
  render: (item: tItem) => JSX.Element;
}) {
  const arr = new Array(length).fill(null);
  return <div {...props}>{arr.map(render)}</div>;
}
