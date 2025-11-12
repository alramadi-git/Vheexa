import z from "zod/v4";

enum eLimit {
  _5 = 5,
  _10 = 10,
  _25 = 25,
  _50 = 50,
  _75 = 75,
  _100 = 100,
}


const zPagination = z
.object({
  page: z.number().min(1),
  limit: z.enum(eLimit),
})
.strict();
type tPagination = z.infer<typeof zPagination>;

export { eLimit };

export type { tPagination };
export { zPagination };

