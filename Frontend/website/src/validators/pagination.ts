import z from "zod";

import { ePageSize } from "../enums/page-size";

const zPagination = z
  .object({
    page: z.optional(z.number().min(1, "page must be at least 1.")),
    pageSize: z.optional(z.enum(ePageSize, "invalid page size.")),
  })
  .strict();
type tPagination = z.infer<typeof zPagination>;

export { ePageSize as ePageSize };

export type { tPagination };
export { zPagination };
