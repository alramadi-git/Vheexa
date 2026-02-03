import z from "zod";

import { ePageSizeService } from "./enums/pagination";

const zPagination = z
  .object({
    page: z.optional(z.number().min(1, "page must be at least 1.")),
    pageSize: z.optional(z.enum(ePageSizeService, "invalid page size.")),
  })
  .strict();
type tPagination = z.infer<typeof zPagination>;

export { ePageSizeService as ePageSize };

export type { tPagination };
export { zPagination };
