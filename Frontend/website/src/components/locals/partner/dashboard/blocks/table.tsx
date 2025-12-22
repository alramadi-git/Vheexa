"use client";

import { ePageSize } from "@/validations/pagination";
import { tRoleModel } from "@/models/partner/role";

import { useTranslations } from "next-intl";

import { ReactElement, Fragment } from "react";
import {
  Table as ShadcnTable,
  TableHeader,
  TableBody,
  TableRow,
} from "@/components/shadcn/table";

import { FullHDImage } from "@/components/locals/blocks/images";

type tTableProps = {
  isLoading: boolean;
  loadingRowCount: ePageSize;
  loadingRender: ReactElement<typeof TableRow>;
  isSuccess: boolean;
  data: tRoleModel[];
  header: ReactElement<typeof TableHeader>;
  emptyRender: () => ReactElement<typeof TableRow>;
  bodyRowRender: (item: tRoleModel) => ReactElement<typeof TableRow>;
};
export default function Table({
  isLoading,
  loadingRowCount,
  loadingRender,
  isSuccess,
  data,
  header,
  emptyRender,
  bodyRowRender,
}: tTableProps) {
  const loadingRows = Array.from({ length: loadingRowCount });

  return (
    <ShadcnTable>
      {header}
      <TableBody>
        {isLoading ? (
          loadingRows.map((_, index) => (
            <Fragment key={index}>{loadingRender}</Fragment>
          ))
        ) : !isSuccess ? (
          <Error />
        ) : data.length === 0 ? (
          emptyRender()
        ) : (
          data.map((item) => bodyRowRender(item))
        )}
      </TableBody>
    </ShadcnTable>
  );
}

function Error() {
  const tError = useTranslations("components.table.empty");
  return (
    <div className="flex size-full flex-col items-center">
      <FullHDImage
        src={tError("illustrations.url")}
        alt={tError("illustrations.alternate")}
        className="size-[460px] object-contain"
      />
      <p className="text-center text-2xl">{tError("label")}</p>
    </div>
  );
}
