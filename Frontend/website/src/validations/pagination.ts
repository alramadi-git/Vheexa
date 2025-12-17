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
    page: z.optional(z.number().min(1, "Page must be at least 1.")),
    pageSize: z.optional(
      z.enum(
        ePageSize,
        "Invalid page size, try select (e.g., 5, 10, 25, 50, 75, 100).",
      ),
    ),
  })
  .strict();
type tPagination = z.infer<typeof zPagination>;

export { ePageSize };

export type { tPagination };
export { zPagination };
