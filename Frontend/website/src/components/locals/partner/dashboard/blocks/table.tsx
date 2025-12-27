"use client";

import { ePageSize } from "@/validations/pagination";

import { ReactElement, Fragment } from "react";

import {
  Table as ShadcnTable,
  TableHeader,
  TableBody,
  TableRow,
} from "@/components/shadcn/table";

type tTableProps<tData> = {
  isLoading: boolean;
  loadingRender: ReactElement<typeof TableRow>;
  isSuccess: boolean;
  errorRender: ReactElement<typeof TableRow>;
  data: tData[];
  header: ReactElement<typeof TableHeader>;
  emptyRender: ReactElement<typeof TableRow>;
  bodyRowRender: (item: tData) => ReactElement<typeof TableRow>;
};
export default function Table<tData>({
  isLoading,
  loadingRender,
  isSuccess,
  errorRender,
  data,
  header,
  emptyRender,
  bodyRowRender,
}: tTableProps<tData>) {
  const loadingRows = Array.from({ length: ePageSize.ten });

  return (
    <ShadcnTable>
      {header}
      <TableBody>
        {isLoading
          ? loadingRows.map((_, index) => (
              <Fragment key={index}>{loadingRender}</Fragment>
            ))
          : !isSuccess
            ? errorRender
            : data.length === 0
              ? emptyRender
              : data.map((item) => bodyRowRender(item))}
      </TableBody>
    </ShadcnTable>
  );
}
