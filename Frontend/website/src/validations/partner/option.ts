import z from "zod/v4";

const zOptionFilter = z
  .object({
    search: z.optional(z.string().nonempty("search cannot be empty.")),
  })
  .strict();
type tOptionFilter = z.infer<typeof zOptionFilter>;

const zOptionPagination = z
  .object({
    page: z.optional(z.number().min(1, "page must be at least 1.")),
  })
  .strict();
type tOptionPagination = z.infer<typeof zOptionPagination>;

export type { tOptionFilter, tOptionPagination };
export { zOptionFilter, zOptionPagination };
