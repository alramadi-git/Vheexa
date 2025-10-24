import z from "zod/v4";

enum eLIMIT {
  _5 = 5,
  _10 = 10,
  _25 = 25,
  _50 = 50,
  _75 = 75,
  _100 = 100,
}

const zPaginationFilter = z
  .object({
    page: z.number().min(1),
    limit: z.enum(eLIMIT),
  })
  .strict();
type tPagination = z.infer<typeof zPaginationFilter>;

export { eLIMIT };

export type { tPagination };
export { zPaginationFilter };
