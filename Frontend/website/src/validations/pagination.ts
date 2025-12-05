import z from "zod/v4";

enum ePageSize {
  five = 5,
  ten = 10,
  twentyFive = 25,
  fifty = 50,
  seventyFive = 75,
  hundred = 100,
}

const zPagination = z
  .object({
    page: z.number().min(1),
    pageSize: z.enum(ePageSize),
  })
  .strict();
type tPagination = z.infer<typeof zPagination>;

export { ePageSize };

export type { tPagination };
export { zPagination };
