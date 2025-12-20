"use client";

import { useTranslations } from "next-intl";

import {
  Table as ShadcnTable,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/shadcn/table";
import { tRoleModel } from "@/models/partner/role";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Fragment, ReactElement } from "react";
import { FullHDImage } from "@/components/locals/blocks/images";
import { ePageSize } from "@/validations/pagination";

type tTableProps = {
  isLoading: boolean;
  loadingRowCount: ePageSize;
  loadingRender: ReactElement<typeof TableRow>;
  isSuccess: boolean;
  data: tRoleModel[];
  header: ReactElement<typeof TableHeader>;
  bodyRow: (item: tRoleModel) => ReactElement<typeof TableRow>;
};
export default function Table({
  isLoading,
  loadingRowCount,
  loadingRender,
  isSuccess,
  data,
  header,
  bodyRow,
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
          <Empty />
        ) : (
          data.map((item) => bodyRow(item))
        )}
      </TableBody>
    </ShadcnTable>
  );
}

function Empty() {
  const tEmpty = useTranslations("components.table.empty");

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
function Error() {
  const tError = useTranslations("components.table.empty");
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
